import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		let responseMessage = new InternalServerErrorException;

		if (exception instanceof PrismaClientKnownRequestError)
		{
			switch (exception.code)
			{
				case 'P2025':
					responseMessage = new NotFoundException;
					break;
				default:
					responseMessage = new BadRequestException;
					break;
			}
		}

		console.log(exception);

		response.status(responseMessage.getStatus()).json({
			statusCode: responseMessage.getStatus(),
			message: responseMessage.message
		});
	}
}