import Image from "next/image";
import React, { useState } from "react";
import AppLink from "../organisms/AppLink";
import logo from "@assets/images/viloxLogo.png"
import { TbUserCircle } from "react-icons/tb";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { CiPower } from "react-icons/ci";
import Modal from "../organisms/Modal";
import { SignOut } from "@/app/hooks/Auth";
import { useDispatch } from "react-redux";

function SideNav({ user }) {
  const [openModal, setModal] = useState(false)
  const dispatch = useDispatch()
  return (
    <>
      <Modal closeModal={() => { setModal(false) }} size={"sm"} isOpen={openModal}>
        <div className="space-y-3">
          <div>
            Are you sure you want to exit the app
          </div>
          <div className='flex gap-4 items-center'>
            <div onClick={() => SignOut(dispatch)} className='bg-black disabled:bg-opacity-30 cursor-pointer text-white text-center flex-grow rounded-md py-2'>Comfirm</div>
            <div onClick={() => { setModal(false) }} className='hover:bg-gray-50 text-center flex-grow rounded-md py-2 cursor-pointer'>Cancel</div>
          </div>
        </div>
      </Modal>
      <div className="fixed bg-white select-none overflow-y-auto flex flex-col h-screen shadow-md w-64 gap-y-6 py-8 px-1">
        <div className="text-2xl px-1">
          <Image src={logo} className="w-28" alt="Michael Michael" />
        </div>
        <div className="flex-grow gap-y-4 flex flex-col gap-2">
          <div>
            <AppLink
              text={"dashboard"}
              icon={<i className="ri-layout-grid-fill"></i>}
            />
            <AppLink
              text={"revenue"}
              icon={<TfiStatsUp />}
            />
            <AppLink
              text={"orders"}
              icon={<i className="ri-pantone-line"></i>}
              subMenu={[
                { name: "gift card", extra: false },
                { name: "crypto", extra: false },
              ]}
            />
            <AppLink
              text={"transactions"}
              icon={<i className="ri-refund-line"></i>}
              subMenu={[
                { name: "withdrawal", extra: false },
                { name: "payment", extra: false }
              ]}
            />
            <AppLink
              text={"manage product"}
              icon={<i className="ri-p2p-line"></i>}
              subMenu={[
                { name: "gift cards", extra: false },
                { name: "crypto", extra: false },
                { name: "E-funds", extra: false }
              ]}
            />
            <AppLink
              text={"users"}
              icon={<i className="ri-team-line"></i>}
            />
            <AppLink
              text={"staffs"}
              icon={<TbUserCircle />}
            />

            <AppLink
              text={"notifications"}
              icon={<i className="ri-notification-3-line"></i>}
            />
            <AppLink
              text={"settings"}
              icon={<i className="ri-settings-5-line"></i>}
            />
          </div>

        </div>
        <div className="space-y-3">
          <div onClick={() => setModal(true)} className="text-danger hover:bg-danger hover:bg-opacity-15 flex px-3 py-2 items-center gap-1 rounded-lg cursor-pointer">
            <CiPower className="text-2xl" /> SignOut
          </div>
          <div className="px-2 flex items-center gap-2">
            <div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-grow">
              <div className="font-bold text-sm">{user.value.user.name}</div>
              <div className="text-xs text-gray-400">{user.value.user.email}</div>
            </div>
            <div>
              {/* <div className="w-8 h-8 flex items-center justify-center cursor-pointer"><IoEllipsisVerticalOutline /></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
