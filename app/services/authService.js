import { apiWithAuth, apiWithOutAuth, getApiResponse, getErrorResponse } from "./httpService";

export const pagination = (formData) => apiWithAuth.post(formData).then(getApiResponse).catch(getErrorResponse);
export const Applogin = (formData) => apiWithOutAuth.post("admin_login", formData).then(getApiResponse).catch(getErrorResponse);
export const sendOTP = (formData) => apiWithOutAuth.post("/recover/send_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const resendOTP = (formData) => apiWithOutAuth.post("/recover/resend_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const verifyOTP = (formData) => apiWithOutAuth.post("/recover/verify_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const createNewPassword = (formData) => apiWithOutAuth.post("/recover/create_new_password", formData).then(getApiResponse).catch(getErrorResponse);

export const addGiftCardCategory = (formData) => apiWithAuth.post("admin/giftcard/add_giftcard_category", formData).then(getApiResponse).catch(getErrorResponse);
export const updateGiftCardCategory = (formData) => apiWithAuth.post("admin/giftcard/update_giftcard_category", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchGiftCardCategory = (formData) => apiWithAuth.post("admin/giftcard/fetch_card_category", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchGiftCard = (formData) => apiWithAuth.post("admin/giftcard/fetch_giftcard",formData).then(getApiResponse).catch(getErrorResponse);
export const changeGiftCardCategoryStatus = (formData) => apiWithAuth.post("admin/giftcard/change_giftcard_category_status", formData).then(getApiResponse).catch(getErrorResponse);
export const changeGiftCardStatus = (formData) => apiWithAuth.post("admin/giftcard/change_giftcard_status", formData).then(getApiResponse).catch(getErrorResponse);

export const addCrypto = (formData) => apiWithAuth.post("admin/crypto/add_crypto", formData).then(getApiResponse).catch(getErrorResponse);
export const updateCrypto = (formData) => apiWithAuth.post("admin/crypto/update_crypto", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchCrypto = (formData) => apiWithAuth.post("admin/crypto/fetch_crypto", formData).then(getApiResponse).catch(getErrorResponse);

export const addEFund = (formData) => apiWithAuth.post("admin/efund/add_efund", formData).then(getApiResponse).catch(getErrorResponse);
export const updateEFud = (formData) => apiWithAuth.post("admin/efund/update_efund", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchEFund = (formData) => apiWithAuth.post("admin/efund/fetch_efund", formData).then(getApiResponse).catch(getErrorResponse);

export const orderFetchGiftCard = (formData) => apiWithAuth.post("admin/order/giftcard/fetch", formData).then(getApiResponse).catch(getErrorResponse);
export const comfirmGiftCardOrder = (formData) => apiWithAuth.post("admin/order/giftcard/confirm_order", formData).then(getApiResponse).catch(getErrorResponse);

export const orderFetchOrder = (formData) => apiWithAuth.post("admin/order/crypto/fetch", formData).then(getApiResponse).catch(getErrorResponse);
export const comfirmOrderOrder = (formData) => apiWithAuth.post("admin/order/crypto/confirm_order", formData).then(getApiResponse).catch(getErrorResponse);

export const fetchPaymentTransaction = (formData) => apiWithAuth.post("admin/transaction/fetch_payments", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchTransaction = (formData) => apiWithAuth.post("admin/transaction/fetch", formData).then(getApiResponse).catch(getErrorResponse);
export const comfirmTransaction = (formData) => apiWithAuth.post("admin/transaction/confirm", formData).then(getApiResponse).catch(getErrorResponse);

export const fetchUsers = (formData) => apiWithAuth.post("admin/user/fetch", formData).then(getApiResponse).catch(getErrorResponse);
export const suspendUsers = (formData) => apiWithAuth.post("admin/user/suspend", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchAUser = (formData) => apiWithAuth.post("admin/user/fetch_a_user", formData).then(getApiResponse).catch(getErrorResponse);
export const unsuspendUsers = (formData) => apiWithAuth.post("admin/staff/unsuspend", formData).then(getApiResponse).catch(getErrorResponse);

export const fetchStaffs = (formData) => apiWithAuth.post("admin/staff/fetch", formData).then(getApiResponse).catch(getErrorResponse);
export const suspendStaffs = (formData) => apiWithAuth.post("admin/user/suspend", formData).then(getApiResponse).catch(getErrorResponse);
export const unsuspendStaffs = (formData) => apiWithAuth.post("admin/staff/unsuspend", formData).then(getApiResponse).catch(getErrorResponse);

export const dashboardSummary = (formData) => apiWithAuth.post("admin/summary/dashboard", formData).then(getApiResponse).catch(getErrorResponse);
export const staffsSummary = (formData) => apiWithAuth.post("admin/summary/staffs", formData).then(getApiResponse).catch(getErrorResponse);
export const usersSummary = (formData) => apiWithAuth.post("admin/summary/users", formData).then(getApiResponse).catch(getErrorResponse);
export const efundSummary = (formData) => apiWithAuth.post("admin/summary/efund", formData).then(getApiResponse).catch(getErrorResponse);
export const cryptoSummary = (formData) => apiWithAuth.post("admin/summary/crypto", formData).then(getApiResponse).catch(getErrorResponse);
export const giftcardSummary = (formData) => apiWithAuth.post("admin/summary/crypto", formData).then(getApiResponse).catch(getErrorResponse);
export const summary = (formData) => apiWithAuth.post("admin/summary/transactions_payment", formData).then(getApiResponse).catch(getErrorResponse);
export const transactionsPaymentSummary = (formData) => apiWithAuth.post("admin/summary/transactions_payment", formData).then(getApiResponse).catch(getErrorResponse);
export const transactionsWithdrawalSummary = (formData) => apiWithAuth.post("admin/summary/transactions_withdrawal", formData).then(getApiResponse).catch(getErrorResponse);
export const cryptoOrderSummary = (formData) => apiWithAuth.post("admin/summary/crypto_orders", formData).then(getApiResponse).catch(getErrorResponse);
export const giftcardOrderSummary = (formData) => apiWithAuth.post("admin/summary/giftcard_orders", formData).then(getApiResponse).catch(getErrorResponse);
export const topusers = (formData) => apiWithAuth.post("admin/summary/topusers", formData).then(getApiResponse).catch(getErrorResponse);

export const fetchNotification = (formData) => apiWithAuth.post("admin/profile/fetch_notifications", formData).then(getApiResponse).catch(getErrorResponse);
export const changePassword = (formData) => apiWithAuth.post("admin/profile/update_password", formData).then(getApiResponse).catch(getErrorResponse);
export const changeAvatar = (formData) => apiWithAuth.post("admin/profile/change_avatar", formData).then(getApiResponse).catch(getErrorResponse);
export const changeUserName = (formData) => apiWithAuth.post("admin/profile/update", formData).then(getApiResponse).catch(getErrorResponse);



export const cryptoRevenue = (formData) => apiWithAuth.post("admin/summary/crypto_revenue", formData).then(getApiResponse).catch(getErrorResponse);
export const giftcardRevenue = (formData) => apiWithAuth.post("admin/summary/giftcard_revenue", formData).then(getApiResponse).catch(getErrorResponse);
export const transactionRevenue = (formData) => apiWithAuth.post("admin/summary/transaction_revenue", formData).then(getApiResponse).catch(getErrorResponse);
