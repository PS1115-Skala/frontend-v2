export interface SpecialReservation {
    laboratory: string, // labs ?
    contact_name: string,
    contact_email: string,
    reservation_day: Date,
    reservation_hour: string,
    amount_people: number,
    observations: string
}