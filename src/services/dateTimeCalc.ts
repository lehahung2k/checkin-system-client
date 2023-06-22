class DateTimeCalc {
    formatDateTime = (dateTime: Date) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    
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
