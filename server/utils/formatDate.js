const formatDate = (date) => {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Use 24-hour format
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const [
        { value: year },
        ,
        { value: month },
        ,
        { value: day },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
    ] = formatter.formatToParts(date);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default formatDate;