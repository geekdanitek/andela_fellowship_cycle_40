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
}

export default Helpers;
