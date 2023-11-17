export const HttpResponseStatus = {
    PENDING: 'PENDING',
    DONE: 'DONE',
    ERROR: 'ERROR',
  };
  
  export class HttpResponse {
    constructor(initialState, status = HttpResponseStatus.PENDING) {
      this._initialState = initialState;
      this.data = initialState;
      this.status = status;
      this.error = [];
    }
  
    get isDone() {
      return this.status === HttpResponseStatus.DONE;
    }
  
    get isLoading() {
      return this.status === HttpResponseStatus.PENDING;
    }
  
    fetching(resetData = false) {
      if (resetData) {
        this.data = this._initialState;
      }
      this.status = HttpResponseStatus.PENDING;
      return this.clone();
    }
  
    failed(errorMessages) {
      this.error = errorMessages;
      this.status = HttpResponseStatus.ERROR;
      return this.clone();
    }
  
    fetched(data) {
      this.data = data;
      this.status = HttpResponseStatus.DONE;
      return this.clone();
    }
  
    concat(newData) {
      const items = [...this.data.items, ...newData.items];
      return { ...this.data, items };
    }
  
    clone() {
      const self = { ...this };
      Object.setPrototypeOf(self, HttpResponse.prototype);
      return self;
    }
  }
  