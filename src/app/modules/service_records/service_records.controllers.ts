import catchAsync from "@shared/catchAsync";
import httpStatus from "@shared/httpStatus";
import sendResponse from "@shared/sendResponse";
import { ServiceRecordsServices } from "./service_records.services";

const createServiceRecord = catchAsync(async (req, res) => {
	const serviceRecordData = req.body;
	const result =
		await ServiceRecordsServices.createServiceRecordIntoDB(serviceRecordData);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			message: "Failed to create service record",
			data: null,
		});
	}
	return sendResponse(res, {
		code: httpStatus.CREATED,
		success: true,
		message: "Service record created successfully",
		data: result,
	});
});

const getServiceRecords = catchAsync(async (_req, res) => {
	const result = await ServiceRecordsServices.getServiceRecordsFromDB();
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			message: "Failed to fetch service records",
			data: null,
		});
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Service records fetched successfully",
		data: result,
	});
});

const getServiceRecordById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return sendResponse(res, {
			code: httpStatus.BAD_REQUEST,
			success: false,
			message: "Service record ID is required",
			data: null,
		});
	}
	const result = await ServiceRecordsServices.getServiceRecordByIdFromDB(id);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.NOT_FOUND,
			success: false,
			message: "Service record not found",
			data: null,
		});
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Service record fetched successfully",
		data: result,
	});
});

const updateServiceRecordById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return sendResponse(res, {
			code: httpStatus.BAD_REQUEST,
			success: false,
			message: "Service record ID is required",
			data: null,
		});
	}
	const result = await ServiceRecordsServices.updateServiceRecordByIdIntoDB(
		id,
		req.body?.completionDate,
	);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			message: "Failed to mark service as completed",
			data: null,
		});
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Service marked as completed",
		data: result,
	});
});

export const ServiceRecordsControllers = {
	createServiceRecord,
	getServiceRecords,
	getServiceRecordById,
	updateServiceRecordById,
};
