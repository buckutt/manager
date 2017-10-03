/**
 * ChangePin actions
 */

import bcrypt       from 'bcryptjs';
import { get, put } from '../../lib/fetch';


export function changePin({ dispatch }, pins) {
    return new Promise((resolve, reject) => {
        let message = null;

        if (pins.pin !== pins.confirmedPin) {
            message = 'Les deux codes PIN ne sont pas identiques';
        }

        if (pins.currentPin === pins.pin) {
            message = 'L\'ancien et le nouveau code PIN rentrés sont identiques';
        }

        if (pins.pin.length !== 4) {
            message = 'Le nouveau code PIN ne fait pas la bonne longueur';
        }

        if (pins.currentPin.length !== 4) {
            message = 'L\'ancien code est faux';
        }

        if (message) {
            return reject({ message });
        }

        bcrypt.hash(pins.pin, 10, (err, hash) => {
            put('changepin', {
                currentPin: pins.currentPin,
                pin       : hash
            }).then((result) => {
                if (!result.changed) {
                    return reject({ message: 'L\'ancien code est faux' });
                }

                dispatch('updateLoggedUserField', { field: 'pin', value: true });

                resolve({ message: 'Le code PIN a bien été changé' });
            });
        });
    });
}

/**
 * GeneratePin actions
 */

export function askPin({ dispatch }, mail) {
    return new Promise((resolve, reject) => {
        get(`askpin?mail=${mail}`).then((result) => {
            if (!result.success) {
                return reject({ message: 'Cette adresse mail est inconnue' });
            }

            resolve({ message: 'Un mail vient de vous être envoyé à l\'adresse indiquée' });
        })
            .catch(() => reject({ message: 'Une erreur inconnue a eu lieu' }));
    });
}

export function generatePin({ dispatch }, pins) {
    return new Promise((resolve, reject) => {
        let message = null;

        if (pins.pin !== pins.confirmedPin) {
            message = 'Les deux codes PIN ne sont pas identiques';
        }

        if (pins.pin.length !== 4) {
            message = 'Le nouveau code PIN ne fait pas la bonne longueur';
        }

        if (message) {
            return reject({ message });
        }

        bcrypt.hash(pins.pin, 10, (err, hash) => {
            if (!err) {
                put('generatepin', {
                    key: pins.key,
                    pin: hash
                }).then((result) => {
                    if (!result.success) {
                        return reject({ message: 'Ce mail a déjà été utilisé pour changer de mot de passe.' });
                    }

                    resolve({ message: 'Le code PIN a bien été changé' });
                })
                    .catch(() => reject({ message: 'Une erreur inconnue a eu lieu' }));
            }
        });
    });
}
