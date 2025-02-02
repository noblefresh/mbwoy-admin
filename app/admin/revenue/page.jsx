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
        <AppCard withNairaSign figure={summary?.crypto?.all?.success_orders} icon={<LuCoins />} color="text-[#acb452]" text="Successful Crypto Orders" bg="bg-[#acb452]" />
        <AppCard withNairaSign figure={summary?.giftCard?.all?.success_orders} icon={<TbReportSearch />} color="text-[#ffac14]" text="Successful Gift card orders" bg="bg-[#ffac14]" />
        <AppCard withNairaSign figure={summary?.transaction?.all?.total_payment} icon={<GiPayMoney />} color="text-[#7329a4]" text="Successful Transaction" bg="bg-[#7329a4]" />
        <AppCard withNairaSign figure={summary?.transaction?.all?.total_debit} icon={<FcDebt />} color="text-[#ef4444]" text="debts" bg="bg-[#ef4444]" />
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
              !loading &&
              <PieChart series={
                activeTab === "all" ? [234532, 23463] :
                  activeTab === "daily" ? [6723, 4376] :
                    activeTab === "weekly" ? [7432, 345724] :
                      [34645, 5624]
              } labels={["Total Payment", "Total Debt"]} />
            }
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-5 font-bold text-lg">Gift Card Transaction Summary</div>
          <div className="">
            {
              !loading &&
              <PieChart series={
                activeTab === "all" ? [234532, 23463] :
                  activeTab === "daily" ? [6723, 4376] :
                    activeTab === "weekly" ? [7432, 345724] :
                      [34645, 5624]
              } labels={["Total Payment", "Total Debt"]} />
            }
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="p-5 font-bold text-lg">General Transaction Summary</div>
          <div className="">
            {
              !loading &&
              <PieChart series={
                activeTab === "all" ? [234532, 23463] :
                  activeTab === "daily" ? [6723, 4376] :
                    activeTab === "weekly" ? [7432, 345724] :
                      [34645, 5624]
              } labels={["Total Payment", "Total Debt"]} />
            }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Page