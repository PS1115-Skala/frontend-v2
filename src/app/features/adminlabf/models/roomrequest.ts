export interface RoomRequest {
    id: string;
    room_id: string;
    requested_id: string;
    owner_id: string;
    manager_id: string;
    trimester_id: string;
    date: Date;
    status: string;
}