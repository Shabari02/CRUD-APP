import http from "./httpCommon";

class DataService {
    getAll() {
        return http.get("/getAll");
    }

    // get(id) {
    //     return http.get(`/tutorials/${id}`);
    // }

    create(data) {
        return http.post("/add", data);
    }

    update(id, data) {
        return http.put(`/update?id=${id}`, data);
    }

    delete(id) {
        return http.delete(`/delete?id=${id}`);
    }

    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }

    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
    }


// eslint-disable-next-line import/no-anonymous-default-export
export default new DataService();