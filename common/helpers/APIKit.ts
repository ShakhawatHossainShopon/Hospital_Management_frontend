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
            const url = `/patients/${id}`;
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
    Test: {
        AddGroupe: (payload: any) => {
            const url = `/groupe`;
            return client.post(url, payload);
        },
        getGroupe: () => {
            const url = `/groupe`;
            return client.get(url);
        },
        AddTest: (data: any) => {
            const url = `/test`;
            return client.post(url, data);
        },
        getTests: () => {
            const url = `/test`;
            return client.get(url);
        },
        DeleteTest: (id: any) => {
            const url = `/test/${id}`;
            return client.delete(url);
        },
    },
    services: {
        AddServices: (payload: any) => {
            const url = `/services`;
            return client.post(url, payload);
        },
        AllServices: () => {
            const url = `/services`;
            return client.get(url);
        },
        deleteService: (id: any) => {
            const url = `/services/${id}`;
            return client.delete(url);
        },
    },
    references: {
        AddReferences: (payload: any) => {
            const url = `/references`;
            return client.post(url, payload);
        },
        AllReferences: (page = 1) => {
            const url = `/references?page=${page}`;
            return client.get(url);
        },
        deleteReferences: (id: any) => {
            const url = `/references/${id}`;
            return client.delete(url);
        },
    },
    billing: {
        getBillData: (patientId: any) => {
            const url = `/bills/billData/${patientId}`;
            return client.get(url);
        },
        createBill: (payload: any) => {
            const url = `/bills`;
            return client.post(url, payload);
        },
        AllBill: (phone: any, startDate: any, endDate: any, filterDay: any, page: any) => {
            const url = `/bills?page=${page}&mobile_phone=${phone}&from=${startDate}&to=${endDate}&filter=${filterDay}`;
            return client.get(url);
        },
        AllDues: (page: any, phone: any) => {
            const url = `/bills/duebills?mobile_phone=${phone}&page=${page}`;
            return client.get(url);
        },
        Reports: (page: any, phone: any) => {
            const url = `/bills/reports?page=${page}&mobile_phone=${phone}`;
            return client.get(url);
        },
    }
};