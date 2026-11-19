import { faker } from '@faker-js/faker'

const missionID = 'LP-' + faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' })

export const dataMissions = {
    newMission: {
        missionID: missionID,
        rocket: 'Apolo13',
        base: 'aurora',
        departureDate: '2030-12-22',
        returnDate: '29 de dez. de 2030',
        price: '1000',
    }
};