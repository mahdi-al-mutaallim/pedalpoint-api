import catchAsync from "@shared/catchAsync";
import httpStatus from "@shared/httpStatus";
import sendResponse from "@shared/sendResponse";
import { BikesServices } from "./bikes.services";

const createBike = catchAsync(async (req, res) => {
	const bikeData = req.body;
	const result = await BikesServices.createBikeIntoDB(bikeData);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			message: "Failed to add bike",
			data: null,
		});
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Bike added successfully",
		data: result,
	});
});

const getBikes = catchAsync(async (_req, res) => {
	const result = await BikesServices.getBikesFromDB();
	if (!result || result.length === 0) {
		return sendResponse(res, {
			code: httpStatus.NOT_FOUND,
			success: false,
			message: "No bikes found",
			data: null,
		});
	}
	return sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Bikes fetched successfully",
		data: result,
	});
});

const getBikeById = catchAsync(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return sendResponse(res, {
			code: httpStatus.BAD_REQUEST,
			success: false,
			message: "Bike ID is required",
			data: null,
		});
	}
	const result = await BikesServices.getBikeByIdFromDB(id);
	if (!result) {
		return sendResponse(res, {
			code: httpStatus.NOT_FOUND,
			success: false,
			message: "Bike not found",
			data: null,
		});
	}
	sendResponse(res, {
		code: httpStatus.OK,
		success: true,
		message: "Bike fetched successfully",
		data: result,
	});
});

const updateBikeById = catchAsync(async (req, res) => {
	console.log(req, res);
});

const deleteBikeById = catchAsync(async (req, res) => {
	console.log(req, res);
});

export const BikesControllers = {
	createBike,
	getBikes,
	getBikeById,
	updateBikeById,
	deleteBikeById,
};
