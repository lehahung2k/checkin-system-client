class DateTimeCalc {
    formatDateTime = (dateTime: Date) => {
        const year = dateTime.getUTCFullYear();
        const month = String(dateTime.getUTCMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getUTCDate()).padStart(2, '0');
        const hours = String(dateTime.getUTCHours()).padStart(2, '0');
        const minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    
        return `${day}-${month}-${year} ${hours}:${minutes}`;
      };

    calculateEventStatus = (startTime: string, endTime: string): string => {
        const currentDate = new Date();
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        if (currentDate < startDate) {
            return 'Chưa bắt đầu';
        } else if (currentDate >= startDate && currentDate <= endDate) {
            return 'Đang diễn ra';
        } else {
            return 'Đã kết thúc';
        }
    };
}
const dateTimeCalc = new DateTimeCalc();
export default dateTimeCalc;
