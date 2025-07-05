import appError from "@shared/appError";
import catchAsync from "@shared/catchAsync";
import httpStatus from "@shared/httpStatus";
import sendResponse from "@shared/sendResponse";
import { ServiceRecordsServices } from "./service_records.services";

const createServiceRecord = catchAsync(async (req, res) => {
	const serviceRecordData = req.body;
	const result =
		await ServiceRecordsServices.createServiceRecordIntoDB(serviceRecordData);
	if (!result) {
		throw new appError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Failed to create service record",
		);
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
		throw new appError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Failed to fetch service records",
		);
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
		throw new appError(httpStatus.BAD_REQUEST, "Service record ID is required");
	}
	const result = await ServiceRecordsServices.getServiceRecordByIdFromDB(id);
	if (!result) {
		throw new appError(httpStatus.NOT_FOUND, "Service record not found");
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
		throw new appError(httpStatus.BAD_REQUEST, "Service record ID is required");
	}
	const result = await ServiceRecordsServices.updateServiceRecordByIdIntoDB(
		id,
		req.body?.completionDate,
	);
	if (!result) {
		throw new appError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Failed to mark service as completed",
		);
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Service marked as completed",
		data: result,
	});
});

const getInCompleteServiceRecords = catchAsync(async (_req, res) => {
	const result =
		await ServiceRecordsServices.getInCompleteServiceRecordsFromDB();
	if (!result) {
		throw new appError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Failed to fetch service records status",
		);
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Overdue or pending services fetched successfully",
		data: result,
	});
});

export const ServiceRecordsControllers = {
	createServiceRecord,
	getServiceRecords,
	getServiceRecordById,
	updateServiceRecordById,
	getInCompleteServiceRecords,
};
