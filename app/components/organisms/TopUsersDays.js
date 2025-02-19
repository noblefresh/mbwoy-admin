import { topuserDays } from '@/app/services/authService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function TopUsersDays({ extar }) {

    const [topRank, setTopRank] = useState([])

    const fetch = async () => {
        const { status, data } = await topuserDays().catch(err => console.log(err))
        if (status) {
            setTopRank(data.data.topusers);
        }
    }

    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className="">
            <div className="bg-white space-y-4 px-4 py-6 rounded-lg">
                <div className="flex">
                    <div className="flex-grow font-semibold">Top Users Last 30 days</div>
                    
                </div>
                <div className="divide-y divide-gray-200">
                    {
                        topRank.map((user, i) => (
                            <div key={i} className="flex py-2 items-center">
                                <div className="flex-grow flex items-center gap-2">
                                    <div className="">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="">
                                        <div className="text-xs font-bold">{user.name}</div>
                                        <div className="text-gray-400 text-xs">{user.email}</div>
                                    </div>
                                </div>
                                <div className="text-sm">&#8358; {Number(user.total_amount).toLocaleString('en-US')}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TopUsersDays