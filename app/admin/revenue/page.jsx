"use client"
import React, { useEffect, useState } from 'react'
import AppLayout from '@component/layouts/appLayout'
import AppCard from '@/app/components/organisms/AppCard'
import { cryptoRevenue, giftcardRevenue, transactionRevenue } from '@/app/services/authService'
import { GiPayMoney } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { LuCoins } from "react-icons/lu";
import { FcDebt } from "react-icons/fc";
import PieChart from '@/app/components/organisms/PieChart'

function Page() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("daily")
  const [summary, setSummary] = useState({
    crypto: [],
    giftCard: [],
    transaction: []
  })


  const fetchcryptoRevenue = async () => {
    const { status, data } = await cryptoRevenue()
    if (status) {
      setSummary(prv => ({ ...prv, crypto: data.data }))
    }
    console.log(summary);
  }
  const fetchgiftcardRevenue = async () => {
    const { status, data } = await giftcardRevenue()
    if (status) {
      setSummary(prv => ({ ...prv, giftCard: data.data }))
    }
  }

  const fetchtransactionRevenue = async () => {
    const { status, data } = await transactionRevenue()
    if (status) {
      setSummary(prv => ({ ...prv, transaction: data.data }))
    }
  }




  const fetchSummary = async () => {
    await fetchcryptoRevenue()
    await fetchgiftcardRevenue()
    await fetchtransactionRevenue()
    setLoading(false)
  }


  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <AppLayout title={"Summary on all transactions"}>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <AppCard withNairaSign figure={activeTab === "all" ? summary?.crypto?.all?.success_orders : activeTab === "daily" ? summary?.crypto?.daily?.daily_success_orders : activeTab === "weekly" ?summary?.crypto?.weekly?.weekly_success_orders : summary?.crypto?.monthly?.monthly_success_orders} icon={<LuCoins />} color="text-[#acb452]" text="Successful Crypto Orders" bg="bg-[#acb452]" />
        <AppCard withNairaSign figure={activeTab === "all" ? summary?.giftCard?.all?.success_orders : activeTab === "daily" ? summary?.giftCard?.daily?.daily_success_orders : activeTab === "weekly" ? summary?.giftCard?.weekly?.weekly_success_orders : summary?.giftCard?.monthly?.monthly_success_orders} icon={<TbReportSearch />} color="text-[#ffac14]" text="Successful Gift card orders" bg="bg-[#ffac14]" />
        <AppCard withNairaSign figure={activeTab === "all" ? summary?.transaction?.all?.total_payment : activeTab === "daily" ? summary?.transaction?.daily?.daily_success_payment : activeTab === "weekly" ? summary?.transaction?.weekly?.weekly_success_payment : summary?.transaction?.monthly?.monthly_success_payment} icon={<GiPayMoney />} color="text-[#7329a4]" text="Successful Transaction" bg="bg-[#7329a4]" />
        <AppCard withNairaSign figure={activeTab === "all" ? summary?.transaction?.all?.total_debit : activeTab === "daily" ? summary?.transaction?.daily?.daily_success_debit : activeTab === "weekly" ? summary?.transaction?.weekly?.weekly_success_debit : summary?.transaction?.monthly?.monthly_success_debit} icon={<FcDebt />} color="text-[#ef4444]" text="debts" bg="bg-[#ef4444]" />
      </div>
      <div className="flex justify-end">
        <div onClick={() => setActiveTab("all")} className={`px-5 py-2 cursor-pointer text-sm rounded-lg ${activeTab === "all" ? "bg-black text-white" : "hover:bg-gray-100"}`}>All</div>
        <div onClick={() => setActiveTab("daily")} className={`px-5 py-2 cursor-pointer text-sm rounded-lg ${activeTab === "daily" ? "bg-black text-white" : "hover:bg-gray-100"}`}>Daliy</div>
        <div onClick={() => setActiveTab("weekly")} className={`px-5 py-2 cursor-pointer text-sm rounded-lg ${activeTab === "weekly" ? "bg-black text-white" : "hover:bg-gray-100"}`}>Weekly</div>
        <div onClick={() => setActiveTab("monthly")} className={`px-5 py-2 cursor-pointer text-sm rounded-lg ${activeTab === "monthly" ? "bg-black text-white" : "hover:bg-gray-100"}`}>Monthly</div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-lg">
          <div className="p-5 font-bold text-lg">Crypto Transaction Summary</div>
          <div className="">
            {
              !loading && (
                activeTab === "all" ? <PieChart series={[summary?.crypto?.all?.success_orders, summary?.crypto?.all?.rejected_orders]} labels={["Total Payment", "Total Debt"]} /> :
                  activeTab === "daily" ? <PieChart series={[summary?.crypto?.daily?.daily_success_orders, summary?.crypto?.daily?.daily_rejected_orders]} labels={["Total Payment", "Total Debt"]} /> :
                    activeTab === "weekly" ? <PieChart series={[summary?.crypto?.weekly?.weekly_success_orders, summary?.crypto?.weekly?.weekly_rejected_orders]} labels={["Total Payment", "Total Debt"]} /> :
                      <PieChart series={[summary?.crypto?.monthly?.monthly_success_orders, summary?.crypto?.monthly?.monthly_rejected_orders]} labels={["Total Payment", "Total Debt"]} />
              )
            }
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-5 font-bold text-lg">Gift Card Transaction Summary</div>
          <div className="">
            {
              !loading && (
                activeTab === "all" ? <PieChart series={[summary?.giftCard?.all?.success_orders, summary?.giftCard?.all?.rejected_orders]} labels={["Total Payment", "Total Debt"]} /> :
                  activeTab === "daily" ? <PieChart series={[summary?.giftCard?.daily?.daily_success_orders, summary?.giftCard?.daily?.daily_rejected_orders]} labels={["Total Payment", "Total Debt"]} /> :
                    activeTab === "weekly" ? <PieChart series={[summary?.giftCard?.weekly?.weekly_success_orders, summary?.giftCard?.weekly?.weekly_rejected_orders]} labels={["Total Payment", "Total Debt"]} /> :
                      <PieChart series={[summary?.giftCard?.monthly?.monthly_success_orders, summary?.giftCard?.monthly?.monthly_rejected_orders]} labels={["Total Payment", "Total Debt"]} />
              )
            }
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-5 font-bold text-lg">General Transaction Summary</div>
          <div className="">
            {
              !loading && (
                activeTab === "all" ? <PieChart series={[summary?.transaction?.all?.total_payment, summary?.transaction?.all?.total_debit]} labels={["Total Payment", "Total Debt"]} /> :
                  activeTab === "daily" ? <PieChart series={[summary?.transaction?.daily?.daily_success_payment, summary?.transaction?.daily?.daily_success_debit]} labels={["Total Payment", "Total Debt"]} /> :
                    activeTab === "weekly" ? <PieChart series={[summary?.transaction?.weekly?.weekly_success_payment, summary?.transaction?.weekly?.weekly_success_debit]} labels={["Total Payment", "Total Debt"]} /> :
                      <PieChart series={[summary?.transaction?.monthly?.monthly_success_payment, summary?.transaction?.monthly?.monthly_success_debit]} labels={["Total Payment", "Total Debt"]} />
              )
            }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Page