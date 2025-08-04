/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./HTTPKit";
// const defaultFileUploadConfig = {
//     headers: {
//         "Content-Type": "multipart/form-data"
//     }
// };



export const APIKit = {
    user: {
        getUser: () => {
            const url = `/auth/getuser`;
            return client.get(url);
        }
    },
    doctor: {
        getDoctorName: () => {
            const url = `/doctorName`;
            return client.get(url);
        },
        getDoctor: () => {
            const url = `/doctors`;
            return client.get(url);
        },
        getSingleDoctor: (id: any) => {
            const url = `/doctors/${id}`;
            return client.get(url);
        },
        addDoctor: (payload: any) => {
            const url = `/doctors`;
            return client.post(url, payload);
        },
        deleteDoctor: (id: any) => {
            const url = `/doctors/${id}`;
            return client.delete(url);
        }
    },
    patient: {
        addPatient: (payload: any) => {
            const url = `/patients`;
            return client.post(url, payload);
        },
        getPatient: () => {
            const url = `/patients`;
            return client.get(url);
        },
        deletePatient: (id: any) => {
            const url = `/scedule/slot/${id}`;
            return client.delete(url);
        },
        getPatientByPhone: (id: any) => {
            const url = `/patients/search/${id}`;
            return client.get(url);
        },
        getPatientById: (id: any) => {
            const url = `/patients/${id}`;
            return client.get(url);
        },
        updatePatient: (payload: any, id: any) => {
            const url = `/patients/${id}`;
            return client.patch(url, payload);
        },
    }
    ,
    Scedule: {
        addScedule: (payload: any) => {
            const url = `/scedule/store`;
            return client.post(url, payload);
        },
        AllScedule: (doctorId: any, day: any) => {
            const url = `/scedule/slots/doctorId/${doctorId}/day/${day}`;
            return client.get(url);
        },
        GetAllScedule: (id: any) => {
            const url = `/scedule/doctor/${id}`;
            return client.get(url);
        },
        deleteScedule: (id: any) => {
            const url = `/scedule/delete/${id}`;
            return client.delete(url);
        },
        updateSlotStatus: (payload: any) => {
            const url = `/scedule/slot/status`;
            return client.patch(url, payload);
        },
    },
    appoinment: {
        AddAppoinment: (payload: any) => {
            const url = `/appoinment/create`;
            return client.post(url, payload);
        },
        SaveAppoinment: (payload: any) => {
            const url = `/appoinment/save`;
            return client.post(url, payload);
        },
        GetAppoinmentById: (id: any) => {
            const url = `/appoinment/doctor/${id}`;
            return client.get(url);
        },
        GetAllAppoinment: () => {
            const url = `/appoinment/`;
            return client.get(url);
        },
        GetSingleAppoinment: (id: any) => {
            const url = `/appoinment/${id}`;
            return client.get(url);
        },
        payAppoinment: (payload: any) => {
            const url = `/appoinment/payAppoinment`;
            return client.patch(url, payload);
        },
    }
    ,
    tour: {
        getTourDataById: (propertyId: string) => {
            const url = `/tourapplication?propertyId=${propertyId}`;
            return client.get(url);
        },
        updateTourStatus: (id: string, payload: any) => {
            const url = `/tourapplication/update/${id}`;
            return client.patch(url, payload);
        },
        getTourUserId: (id: string) => {
            const url = `/tourapplication?userId=${id}`;
            return client.get(url);
        },
        deleteTour: (id: string) => {
            const url = `/tourapplication/delete/${id}`;
            return client.delete(url);
        },
        getMpropertyTourDataById: (apartmentId: string) => {
            const url = `/tourapplication?apartmentId=${apartmentId}`;
            return client.get(url);
        }
    },
};