import catchAsync from "@shared/catchAsync";

const getCustomers = catchAsync(async (req, res) => {
  console.log(req, res);
});
const createCustomers = catchAsync(async (req, res) => {
  console.log(req, res);
});
const updateCustomers = catchAsync(async (req, res) => {
  console.log(req, res);
});
const deleteCustomers = catchAsync(async (req, res) => {
  console.log(req, res);
});

export const CustomersControllers = {
  getCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers,
};
