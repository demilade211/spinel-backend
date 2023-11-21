import ErrorHandler from "./errorHandler";
import sendEmail from "./sendEmail";

export const paginate = (items, page, perPage) => {
  return items.slice(perPage * (page - 1), perPage * page);
}

export const handleEmail = async (user,next,message) => {
  try {
    await sendEmail({
      email: user.email,
      subject: "Tuale OTP",
      message
    })

    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`
    })

  } catch (error) {
    user.otp = undefined;
    user.expiretoken = undefined;

    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
}


