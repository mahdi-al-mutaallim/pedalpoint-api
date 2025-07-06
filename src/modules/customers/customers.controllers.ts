import appError from "../../shared/appError.js";
import catchAsync from "../../shared/catchAsync.js";
import httpStatus from "../../shared/httpStatus.js";
import sendResponse from "../../shared/sendResponse.js";
import { CustomersServices } from "./customers.services.js";

const createCustomer = catchAsync(async (req, res) => {
	const result = await CustomersServices.createCustomerIntoDB(req.body);
	if (!result) {
		throw new appError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Failed to create customer",
		);
	}
	sendResponse(res, {
		code: httpStatus.CREATED,
		success: true,
		message: "Customer created successfully",
		data: result,
	});
});

const getCustomers = catchAsync(async (_req, res) => {
	const result = await CustomersServices.getCustomersFromDB();
	if (!result || result.length === 0) {
		throw new appError(httpStatus.NOT_FOUND, "No Customers found");
	}
	sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Customers fetched successfully",
		data: result,
	});
});

const getCustomerById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new appError(httpStatus.BAD_REQUEST, "Customer ID is required");
	}
	const result = await CustomersServices.getCustomerByIdFromDB(id);
	if (!result) {
		throw new appError(httpStatus.NOT_FOUND, "Customer not found");
	}
	sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Customer fetched successfully",
		data: result,
	});
});

const updateCustomerById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new appError(httpStatus.BAD_REQUEST, "Customer ID is required");
	}
	const result = await CustomersServices.updateCustomerByIdIntoDB(id, req.body);
	if (!result) {
		throw new appError(httpStatus.NOT_FOUND, "Customer not found");
	}
	sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Customer updated successfully",
		data: result,
	});
});

const deleteCustomerById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new appError(httpStatus.BAD_REQUEST, "Customer ID is required");
	}
	const result = await CustomersServices.deleteCustomerByIdFromDB(id);
	if (!result) {
		throw new appError(httpStatus.NOT_FOUND, "Customer not found");
	}
	sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Customer deleted successfully",
	});
});

export const CustomersControllers = {
	getCustomers,
	getCustomerById,
	createCustomer,
	updateCustomerById,
	deleteCustomerById,
};
