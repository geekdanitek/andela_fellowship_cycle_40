class Helpers {
  static isRequired(req, value) {
    if (!Array.isArray(value)) {
      return 'Required set should be an array';
    }

    if (value.length === 0) {
      return 'Required set array cannot be empty';
    }
    const errors = { notAString: false, emptyString: false };
    const required = [];

    value.map((value) => {
      if (typeof value !== 'string') {
        errors.notAString = true;
      }

      if (value.length < 1) {
        errors.emptyString = true;
      }

      if (!Object.keys(req).includes(value)) {
        required.push({ [value]: `${value} field is required` });
      }
    });

    if (errors.notAString) {
      return 'All data passed into the array must be a string';
    }
    if (errors.emptyString) {
      return 'data passed into the array must not be empty';
    }

    return required;
  }

  static successResponse(res, code, data){
    return res.status(code).json({
      status: code,
      data: data
    })
  }

  static errorResponse(res, code, message) {
    return res.status(code).json({
      status: code,
      error: message
    })
  }
  static dateFormatter(dateToBeFormatted){
      if(typeof dateToBeFormatted !== 'string') return null;
      let spliter = new Date(dateToBeFormatted).toDateString().split(" ");
      return `${spliter[0]} ${Helpers.ordinalizer(spliter[2])} ${spliter[1]}, ${spliter[3]}`;
  }

  static ordinalizer(number){
       let j = number % 10;
       let k = number % 100;

       if(number == 0) return 0;
       if (j == 1 && k != 11) return this.removeLeadingZero(number) + "st";
       if (j == 2 && k != 12) return this.removeLeadingZero(number) + "nd";
       if (j == 3 && k != 13)  return Helpers.removeLeadingZero(number) + "rd";

       return number + "th";
  }

  static removeLeadingZero(number){
      if(typeof number === 'number'){
        number = number.toString();
      }
      let formatted = number.split('');
      if(formatted[0] === '0'){
        delete formatted[0];
      }
      return formatted.join('');
    }
}

export default Helpers;
