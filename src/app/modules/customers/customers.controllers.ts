import appError from "@shared/appError";
import catchAsync from "@shared/catchAsync";
import httpStatus from "@shared/httpStatus";
import sendResponse from "@shared/sendResponse";
import { CustomersServices } from "./customers.services";

const createCustomer = catchAsync(async (req, res) => {
	const result = await CustomersServices.createCustomerIntoDB(req.body);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			message: "Failed to create customer",
			data: null,
		});
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
		throw new appError(httpStatus.NOT_FOUND, "Customer not found");
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
		return sendResponse(res, {
			code: httpStatus.BAD_REQUEST,
			success: false,
			message: "Customer ID is required",
			data: null,
		});
	}
	const result = await CustomersServices.getCustomerByIdFromDB(id);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.NOT_FOUND,
			success: false,
			message: "Customer not found",
			data: null,
		});
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
		return sendResponse(res, {
			code: httpStatus.BAD_REQUEST,
			success: false,
			message: "Customer ID is required",
		});
	}
	const result = await CustomersServices.updateCustomerByIdIntoDB(id, req.body);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.NOT_FOUND,
			success: false,
			message: "Customer not found",
		});
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
		return sendResponse(res, {
			code: httpStatus.BAD_REQUEST,
			success: false,
			message: "Customer ID is required",
		});
	}
	const result = await CustomersServices.deleteCustomerByIdFromDB(id);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.NOT_FOUND,
			success: false,
			message: "Customer not found",
		});
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
