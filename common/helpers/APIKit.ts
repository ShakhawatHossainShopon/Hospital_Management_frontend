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
        }
    },

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