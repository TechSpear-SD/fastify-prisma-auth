export interface MaintenanceRequestBody {
    enabled: boolean;
}

export interface MaintenanceResponse {
    enabled: boolean;
    startTime: string | null;
}

export const maintenanceStateSchema = {
    body: {
        type: 'object',
        required: ['enabled'],
        properties: {
            enabled: { type: 'boolean' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                enabled: { type: 'boolean' },
                startTime: { type: ['string', 'null'] },
            },
        },
    },
};
