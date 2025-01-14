import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import AppInput from "../../organisms/AppInput";
import { changePassword } from "@/app/services/authService";
import serialize from "@/app/hooks/Serialize";

const ChangePassword = ({ goBack }) => {
  const [disable, setDisabled] = useState(true)
  const [formError, setFormError] = useState("")

  const changeNow = async (e) => {
    e.preventDefault();
    const val = serialize(e.target)
    if (val.new_password === val.comfirm_password) {
      const { status, data } = await changePassword(val).catch(err => console.log(err))
      if (status) {
        e.target.reset()
      } else {
        setFormError(data.message)
      }
    } else {
      setFormError("New Password do not match comfirm Password")
    }
  }


  return (
    <form onSubmit={(e) => changeNow(e)} className="flex flex-col h-full">
      <div className="text-center dark:text-white-1 md:hidden py-4 relative">
        <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
        <div className="">Change Password</div>
      </div>
      <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
        <span className="text-[18px] dark:text-white-1 font-semibold">Change Password</span>
      </div>
      <div className="px-4 md:px-0 text-danger text-sm">{formError}</div>
      <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
        <AppInput type={"password"} onChange={(e) => setDisabled(false)} label={"Current Password"} required name={"old_password"} />
        <AppInput type={"password"} onChange={(e) => setDisabled(false)} label={"New Password"} required name={"new_password"} />
        <AppInput type={"password"} onChange={(e) => setDisabled(false)} label={"Comfirm Password"} required name={"comfirm_password"} />
      </div>
      <div className="flex px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
        <button disabled={disable} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
          Confirm
        </button>
        <button className="font-semibold w-full md:w-auto text-[#344051]">Cancel</button>
      </div>
    </form>
  );
};

export default ChangePassword;
