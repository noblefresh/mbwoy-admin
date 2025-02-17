"use client"
import React, { useEffect, useState } from 'react'
import AppLayout from '@component/layouts/appLayout'
import AppCard from '@/app/components/organisms/AppCard'
import { fetchAUser, fetchUsers, fundAUser, suspendUsers, unsuspendUsers, usersSummary } from '@/app/services/authService'
import { TbEye } from 'react-icons/tb'
import Modal from '@/app/components/organisms/Modal'
import serialize from '@/app/hooks/Serialize'
import AppPagination from '@/app/components/organisms/AppPagination'
import ResponseModal from '@/app/components/organisms/ResponseModal'
import { debounce } from '@/app/hooks/useDebounce'
import AppInput from '@/app/components/organisms/AppInput'
import TopUsers from '@/app/components/organisms/TopUsers'

function Page() {
  const [topRank, setTopRank] = useState(["", "", "", "", ""])

  const [catego, setcate] = useState(["", "", "", "", "", "", "", "", "", "", ""])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [x, setX] = useState({})
  const [proccessing, setProccessing] = useState(false)
  const [xter, setXter] = useState({})
  const [topUpUser, setTopUpUser] = useState({})
  const [summary, setSummary] = useState([])
  const [alertMsg, setAlert] = useState(false)
  const [alertMsgData, setAlertData] = useState(false)

  const fetch = async () => {
    const { status, data } = await fetchUsers().catch(err => console.log(err))
    if (status) {
      setcate(data.data);
    }
    fetchSummary()
    setLoading(false)
  }


  const showTopUpForm = (val) => {
    setTopUpUser(val)
  }

  const fetchTheUser = async () => {
    const { status, data } = await fetchAUser({ id: x.wallet.user_id }).catch(err => console.log(err))
    if (status) {
      setXter(data.data[0])
    }
  }

  const searchFN = debounce(async (e) => {
    const { status, data } = await fetchUsers({ search: e }).catch(err => console.log(err))
    if (status) {
      setcate(data.data);
    }
  }, 3000);


  const submit = async (e) => {
    e.preventDefault();
    const val = serialize(e.target)
    setProcessing(true)
    if (val.status === "active") {
      const { status, data } = await suspendUsers(val).catch(err => console.log(err))
      if (status) {
        fetch()
        setX({})
      }
      setAlert(true)
      setAlertData(data)
    } else {
      const { status, data } = await unsuspendUsers(val).catch(err => console.log(err))
      if (status) {
        fetch()
        setX({})
      }
      setAlert(true)
      setAlertData(data)
    }
    setProcessing(false)
  }


  const topUpUserAccount = async (e) => {
    e.preventDefault();
    console.log(e);
    setProccessing(true)
    const payload = serialize(e.target)
    const { status, data } = await fundAUser(payload).catch(err => console.log(err))
    if (status) {
      fetch()
      setTopUpUser({})
    }
    setAlert(true)
    setAlertData(data)
    setProccessing(false)
  }



  const fetchSummary = async () => {
    const { status, data } = await usersSummary().catch(err => console.log(err))
    if (status) {
      setSummary(data.data);
    }
  }

  useEffect(() => {
    fetchSummary()
    fetch()
  }, [])

  useEffect(() => {
    Object.keys(x).length > 0 && fetchTheUser()
  }, [x])



  return (
    <AppLayout title={"Summary of Mbwoy users"}>
      {
        Object.keys(x).length > 0 && (
          <Modal closeModal={() => setX({})} size={"2xl"} isOpen={Object.keys(x).length > 0}>
            <form onSubmit={(e) => { submit(e) }} >
              <div className='space-y-5'>
                <div className="">
                  <div className="grid gap-y-4 grid-cols-2">
                    <div className=''>
                      <div className='font-bold'>Name:</div>
                      <div className='text-gray-500'>{x?.name}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Email:</div>
                      <div className='text-gray-500'>{x?.email}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Phone:</div>
                      <div className='text-gray-500'>{x?.phone}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Gender:</div>
                      <div className='text-gray-500'>{x?.gender}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Balance:</div>
                      <div className='text-gray-500'>&#8358; {Number(x?.wallet.balance).toLocaleString('en-US')}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Bouns:</div>
                      <div className='text-gray-500'>&#8358; {Number(x?.wallet.bonus).toLocaleString('en-US')}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Referral by:</div>
                      <div className='text-gray-500'>{x?.referral_by}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Status:</div>
                      <div className='text-gray-500'>{x?.status}</div>
                    </div>
                    <div className='col-span-2'>
                      <div className='font-bold'>Address:</div>
                      <div className='text-gray-500'>{x?.address}</div>
                    </div>
                    <div className='col-span-2'>
                      <div className='font-bold'>Transaction(s):</div>
                      <div className='h-44 overflow-y-auto space-y-2'>
                        {
                          xter?.transaction?.map((data, i) => (
                            <div className="space-y-1 bg-gray-50 px-3 py-2 rounded-xl text-xs" key={i}>
                              <div className="capitalize font-bold">{data.type}</div>
                              <div className="text-sm">&#8358; {Number(data.amount).toLocaleString('en-US')}</div>
                              <div className="">Transaction ID : {data.transaction_id}</div>
                              <div className="flex items-center justify-between">
                                <div className="">
                                  <div className={`text-[9px] px-3 inline py-[2px] rounded-lg bg-opacity-10 ${data.status === "success" ? "text-success bg-success" : data.status === "failed" ? "text-danger bg-danger" : "text-yellow bg-yellow"}`}>{data.status}</div>
                                </div>
                                <div className="text-gray-400 text-xs">{data.created_at.split("T")[0]}</div>
                              </div>
                            </div>
                          ))
                        }

                      </div>
                    </div>
                  </div>
                </div>
                <input type='hidden' value={x.id} name='id' />
                <input type='hidden' value={x.status} name='status' />
                <div className='flex gap-4 items-center'>
                  <button disabled={processing} className='bg-black disabled:bg-opacity-30 text-white text-center flex-grow rounded-md py-2'>{processing ? "Updating..." : x.status === "active" ? "Suspend" : "Activate"}</button>
                  <div onClick={() => { setX({}) }} className='hover:bg-gray-50 text-center flex-grow rounded-md py-2 cursor-pointer'>Cancel</div>
                </div>
              </div>
            </form>
          </Modal>
        )
      }


      {
        Object.keys(topUpUser).length > 0 && (
          <Modal closeModal={() => setTopUpUser({})} size={"sm"} isOpen={Object.keys(topUpUser).length > 0}>
            <form onSubmit={(e) => topUpUserAccount(e)} className="space-y-4">
              <div className="flex-grow flex items-center gap-2">
                <div className="">
                  <div className="w-8 bg-gray-100 rounded-full h-8"></div>
                </div>
                <div className="">
                  <div className="font-bold">{topUpUser.name}</div>
                  <div className="text-xs text-gray-400 w-64 trunck-text">{topUpUser.email}</div>
                </div>
              </div>
              <input type='hidden' name="user_id" value={topUpUser?.id} />
              <AppInput name="amount" required type={"number"} label="Enter Amount" />
              <div className="flex gap-3">
                <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Top-Up Now"}</button>
              </div>
            </form>
          </Modal>
        )
      }



      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <AppCard figure={summary?.active} icon={<i className="ri-user-star-line"></i>} color="text-[#13f444]" text="Total Active Users" bg="bg-[#13f444]" />
            <AppCard figure={summary?.suspended} icon={<i className="ri-user-forbid-line"></i>} color="text-[#ef4444]" text="Total Suspended Users" bg="bg-[#ef4444]" />
          </div>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-grow">
                <div className="max-w-sm">
                  <AppInput name="search" onChange={(e) => searchFN(e.target.value)} required label="Search by Name and Email" />
                </div>
              </div>
            </div>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='bg-black px-3 py-2 rounded-l-lg text-left text-white' scope="">Username</th>
                  <th className='bg-black px-3 py-2 text-left text-white hidden sm:table-cell' scope="">Phone</th>
                  <th className='bg-black px-3 py-2 text-left text-white hidden lg:table-cell' scope="">Referral by</th>
                  <th className='bg-black px-3 py-2 rounded-r-lg text-left hidden sm:table-cell text-white' scope="">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  !loading && catego?.data.map((data, i) => (
                    <tr className='odd:bg-white' key={i}>
                      <td className='px-3 py-2 text-[10px] text-left flex' scope="">
                        <div className="flex-grow flex items-center gap-2">
                          <div className="">
                            <div className="w-8 bg-gray-100 rounded-full h-8"></div>
                          </div>
                          <div className="">
                            <div className="font-bold">{data.name}</div>
                            <div className="text-xs text-gray-400 w-64 trunck-text">{data.email}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end sm:hidden gap-2">
                          <div className="flex-grow">
                            <div className={`text-[9px] px-3 inline py-[2px] rounded-lg bg-opacity-10 ${data.status === "active" ? "text-success bg-success" : "text-danger bg-danger"}`}>{data.status}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div onClick={() => { setX(data) }} className="w-7 h-7 cursor-pointer rounded-md text-black flex items-center justify-center bg-gray-200 ">
                              <TbEye />
                            </div>
                            <div className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => showTopUpForm(data)}>Top-up</div>
                          </div>
                        </div>
                      </td>
                      <td className='px-3 py-2 text-left hidden sm:table-cell' scope="">{data.phone}</td>
                      <td className='px-3 py-2 text-left hidden lg:table-cell' scope="">{data?.referral_by}</td>
                      <td className='px-3 py-2 text-left hidden sm:table-cell' scope="">
                        <div className="flex items-center gap-3">
                          <div className="flex-grow">
                            <div className={`text-[9px] px-3 inline py-[2px] rounded-lg bg-opacity-10 ${data.status === "active" ? "text-success bg-success" : "text-danger bg-danger"}`}>{data.status}</div>
                          </div>
                          <div onClick={() => { setX(data) }} className="w-7 h-7 cursor-pointer rounded-md text-black flex items-center justify-center bg-gray-200 "><TbEye /></div>
                          <div className="bg-black text-white text-xs px-4 py-2 rounded-lg cursor-pointer" onClick={() => showTopUpForm(data)}>Top-up</div>
                        </div>
                      </td>
                    </tr>
                  ))
                }

                {
                  loading && ["", "", "", "", "", ""].map((data, i) => (
                    <tr className='odd:bg-white' key={i}>
                      <td className='px-3 py-2 text-[10px] text-left flex' scope="">
                        <div className="flex-grow flex items-center gap-2">
                          <div className="">
                            <div className="w-8 bg-gray-100 preload rounded-full h-8"></div>
                          </div>
                          <div className="w-full space-y-2">
                            <div className="font-bold preload py-2 w-1/3"></div>
                            <div className="text-xs text-gray-400 preload py-1 w-2/3"></div>
                          </div>
                        </div>
                      </td>
                      <td className='px-3 py-2 text-left hidden sm:table-cell' scope="">
                        <div className="preload py-2 w-2/3"></div>
                      </td>
                      <td className='px-3 py-2 text-left hidden lg:table-cell' scope="">
                        <div className="preload py-2 w-2/3"></div>
                      </td>
                      <td className='px-3 py-2 text-left hidden sm:table-cell' scope="">
                        <div className="flex items-center gap-3">
                          <div className="flex-grow">
                            <div className={`text-[9px] px-7 inline py-[2px] rounded-lg bg-opacity-10 preload`}></div>
                          </div> <div className="w-7 h-7 preload cursor-pointer rounded-md text-black flex items-center justify-center bg-gray-200 "></div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <AppPagination totalRecords={catego} newData={(e) => setcate(e)} />
          </div>
        </div>
        <div className="">
          <TopUsers />
        </div>
      </div>
      <ResponseModal
        status={alertMsgData?.success}
        isOpen={alertMsg}
        onClose={() => setAlert(false)}
        message={alertMsgData?.message}
      />
    </AppLayout>
  )
}

export default Page