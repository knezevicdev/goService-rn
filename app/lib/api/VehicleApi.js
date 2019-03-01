import Api from "./Api";

class VehicleApi extends Api {
    static changeState = (id, serviceState, location) => {
        return this.patch(`/back/vehicles?code=${id}`, {
            serviceState,
            position: {
                'coordinates': [ location.coords.longitude , location.coords.latitude ]
            }
        });
    };

    static list = (id = 3) => {
        return this.get(`/back/vehicles/branch/${id}`);
    };

    static details = (id) => {
        return this.get(`/back/vehicles/${id}/details`);
    };

    static locate = (id) => {
        return this.post(`/back/vehicles/${id}/locate`);
    };

    static alarmOn = (id) => {
        return this.post(`/back/vehicles/${id}/alarmOn`);
    };

    static alarmOff = (id) => {
        return this.post(`/back/vehicles/${id}/alarmOff`);
    };
}

export default VehicleApi;