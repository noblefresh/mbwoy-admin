"use client"
import React, { useEffect, useState } from 'react'
import AppLayout from '@component/layouts/appLayout'
import AppCard from '@/app/components/organisms/AppCard'
import { comfirmOrderOrder, cryptoOrderSummary, orderFetchOrder } from '@/app/services/authService'
import AppPagination from '@/app/components/organisms/AppPagination'
import { PiFingerprintSimpleThin } from 'react-icons/pi'
import Modal from '@/app/components/organisms/Modal'
import AppInput from '@/app/components/organisms/AppInput'
import serialize from '@/app/hooks/Serialize'
import ResponseModal from '@/app/components/organisms/ResponseModal'
import Link from 'next/link'

function Page() {
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [catego, setcate] = useState(["", "", "", ""])
  const [selected, setSelected] = useState("")
  const [summary, setSummary] = useState([])
  const [x, setX] = useState({})
  const [alertMsg, setAlert] = useState(false)
  const [alertMsgData, setAlertData] = useState(false)

  const fetch = async () => {
    const { status, data } = await orderFetchOrder().catch(err => console.log(err))
    if (status) {
      setcate(data.data[0]);
    }
    fetchSummary()
    setLoading(false)
  }




  const submit = async (e) => {
    e.preventDefault();
    const val = serialize(e.target)
    setProcessing(true)
    const { status, data } = await comfirmOrderOrder(val).catch(err => console.log(err))
    if (status) {
      fetch()
      setId(0)
      setSelected("")
      setX({})
    }
    setProcessing(false)
    setAlert(true)
    setAlertData(data)
  }




  const fetchSummary = async () => {
    const { status, data } = await cryptoOrderSummary().catch(err => console.log(err))
    if (status) {
      setSummary(data.data);
    }
  }

  useEffect(() => {
    fetchSummary()
    fetch()
  }, [])
  return (
    <AppLayout title={"Summary on Crypto orders"}>
      {
        id !== 0 && (
          <Modal closeModal={() => { setId(0); setSelected("") }} size={"sm"} isOpen={id !== 0}>
            <form onSubmit={(e) => { submit(e) }} >
              <div className='space-y-5'>
                <div className="text-xl font-bold">Order Infomation</div>
                {
                  x?.images !== null && x?.images.map((e, i) => (
                    <Link href={e} key={i} target='_blank'>
                      <div className="h-72 bg-gray-50 rounded-md overflow-hidden">
                        <img src={e} className='h-full' />
                      </div>
                    </Link>

                  ))
                }

                <div className="">
                  <div className="grid grid-cols-2">
                    <div className=''>
                      <div className='font-bold'>Amount:</div>
                      <div className='text-gray-500'>${Number(x?.amount).toLocaleString('en-US')}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Rate:</div>
                      <div className='text-gray-500'>&#8358;{Number(x?.rate).toLocaleString('en-US')}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Amount to send:</div>
                      <div className='text-gray-500'>&#8358;{Number(x?.amount_to_pay).toLocaleString('en-US')}</div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="grid grid-cols-2">
                    <div className=''>
                      <div className='font-bold'>Card Name:</div>
                      <div className='text-gray-500'>{x?.crypto?.name}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Sell rate low:</div>
                      <div className='text-gray-500'>&#8358;{Number(x?.crypto?.sell_rate_low).toLocaleString('en-US')}</div>
                    </div>
                    <div className=''>
                      <div className='font-bold'>Sell rate high:</div>
                      <div className='text-gray-500'>&#8358;{Number(x?.crypto?.sell_rate_high).toLocaleString('en-US')}</div>
                    </div>
                  </div>
                </div>
                <input type='hidden' value={id} name='id' />
                {
                  x.status === "processing" ? (
                    <div className="space-y-4">
                      <AppInput type={"select"} onChange={(e) => setSelected(e)} options={["success", "rejected"]} name="status" required label="Status" />
                      {selected === "success" && <AppInput type={"number"} name="amount" required label="Comfirm amount" />}
                      {selected === "rejected" && <AppInput type={"textarea"} name="reason" required label="Reason" />}
                      <div className='flex gap-4 items-center'>
                        <button disabled={processing || selected === ""} className='bg-black disabled:bg-opacity-30 text-white text-center flex-grow rounded-md py-2'>{processing ? "Confirming..." : "Confirm"}</button>
                        <div onClick={() => { setId(0); setSelected("") }} className='hover:bg-gray-50 text-center flex-grow rounded-md py-2 cursor-pointer'>Cancel</div>
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <div className="">
                        <div className='font-bold'>Status:</div>
                        <div className={`text-[9px] px-3 inline py-[2px] rounded-lg bg-opacity-10 ${x.status === "success" ? "text-success bg-success" : x.status === "rejected" ? "text-danger bg-danger" : "text-yellow bg-yellow"}`}>{x.status}</div>
                      </div>
                      <div onClick={() => { setId(0); setSelected("") }} className='hover:bg-gray-50 text-center flex-grow rounded-md py-2 cursor-pointer'>Cancel</div>
                    </div>
                  )
                }
              </div>
            </form>
          </Modal>
        )
      }

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AppCard figure={summary?.total} icon={<i className="ri-exchange-funds-line"></i>} color="text-[#000000]" text="Total Crypto orders" bg="bg-[#000000]" />
        <AppCard figure={summary?.proressing} icon={<i className="ri-pass-pending-line"></i>} color="text-[#fff444]" text="Pending Crypto orders" bg="bg-[#fff444]" />
        <AppCard figure={summary?.success} icon={<i className="ri-bard-line"></i>} color="text-[#11c9a4]" text="Completed Crypto orders" bg="bg-[#11c9a4]" />
      </div>
      <div className="space-y-3">
        <table className='w-full'>
          <thead>
            <tr>
              <th className='bg-black px-3 py-2 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none text-left text-white' scope="">Username</th>
              <th className='bg-black px-3 py-2 text-left text-white hidden sm:table-cell' scope="">Type</th>
              <th className='bg-black px-3 py-2 text-left text-white hidden lg:table-cell' scope="">Amount</th>
              <th className='bg-black px-3 py-2 text-left text-white hidden lg:table-cell' scope="">Rate</th>
              <th className='bg-black px-3 py-2 rounded-tr-lg text-left hidden sm:table-cell text-white' scope="">Status</th>
            </tr>
          </thead>
          <tbody className='last:first:rounded-br-lg last:last:rounded-bl-lg'>
            {
              !loading && catego?.data?.map((data, i) => (
                <tr className='odd:bg-white' key={i}>
                  <td className='px-3 py-2 text-[10px] text-left flex' scope="">
                    <div className="flex-grow flex items-center gap-2">
                      <div className="">
                        <div className="w-8 bg-gray-100 rounded-full h-8"></div>
                      </div>
                      <div className="">
                        <div className="font-bold">{data.user.name}</div>
                        <div className="text-xs text-gray-400">{data.user.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end sm:hidden gap-2">
                      <div className="flex-grow">
                        <div className={`text-[9px] px-3 inline py-[2px] rounded-lg bg-opacity-10 ${data.status === "success" ? "text-success bg-success" : data.status === "rejected" ? "text-danger bg-danger" : "text-yellow bg-yellow"}`}>{data.status}</div>
                      </div>
                      <div onClick={() => { setId(data.id); setX(data) }} className="w-7 h-7 cursor-pointer rounded-md text-black flex items-center justify-center bg-gray-200 "><PiFingerprintSimpleThin /></div>
                    </div>
                  </td>
                  <td className='px-3 py-2 text-left capitalize hidden sm:table-cell' scope="">{data.type}</td>
                  <td className='px-3 py-2 text-left hidden lg:table-cell' scope="">${new Intl.NumberFormat().format(data?.amount)}</td>
                  <td className='px-3 py-2 text-left hidden lg:table-cell' scope="">&#8358;{new Intl.NumberFormat().format(data?.rate)}</td>
                  <td className='px-3 py-2 text-left hidden sm:table-cell' scope="">
                    <div className="flex items-center gap-3">
                      <div className="flex-grow">
                        <div className={`text-[9px] px-3 inline py-[2px] rounded-lg bg-opacity-10 ${data.status === "success" ? "text-success bg-success" : data.status === "rejected" ? "text-danger bg-danger" : "text-yellow bg-yellow"}`}>{data.status}</div>
                      </div>
                      <div onClick={() => { setId(data.id); setX(data) }} className="w-7 h-7 cursor-pointer rounded-md text-black flex items-center justify-center bg-gray-200 "><PiFingerprintSimpleThin /></div>
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
                      <div className="w-full space-y-1">
                        <div className="font-bold preload w-1/2 py-2"></div>
                        <div className="text-xs preload w-2/3 pt-3 text-gray-400"></div>
                      </div>
                    </div>
                  </td>
                  <td className='px-3 py-2 text-left capitalize hidden sm:table-cell' scope="">
                    <div className="preload w-3/4 py-2"></div>
                  </td>
                  <td className='px-3 py-2 text-left hidden lg:table-cell' scope="">
                    <div className="preload w-3/4 py-2"></div>
                  </td>
                  <td className='px-3 py-2 text-left hidden lg:table-cell' scope="">
                    <div className="preload w-3/4 py-2"></div>
                  </td>
                  <td className='px-3 py-2 text-left hidden sm:table-cell' scope="">
                    <div className="flex items-center gap-3">
                      <div className="flex-grow">
                        <div className={`text-[9px] px-12 inline preload py-[2px] rounded-lg bg-opacity-10 `}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <AppPagination totalRecords={catego} newData={(e) => setcate(e[0])} />
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