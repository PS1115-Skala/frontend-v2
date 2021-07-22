export interface ScheduleResponse {
    typeWeek: string;
    schedule: InfoScheduleResponse[];
}

interface InfoScheduleResponse {
    day: string;
    hour: number;
    id: string;
    material_needed: string;
    quantity: number;
    reason: string;
    requester_id: string;
    reservation_request_id: string;
    room_id: string;
    send_time: string;
    status: string;
    subject_id: string;
    trimester_id: string;
    week: number;
}

export interface ScheduleAsignation {
    subject_id: string;
    day: string;
    hour: number;
    week: number;
}