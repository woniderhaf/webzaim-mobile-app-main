import { makeAutoObservable } from 'mobx';
import { IRootStore, IUserStore } from '../core';
import { getUserExternal, getUserProfile, getUserReferralLink, patchUserProfile } from '../core/api';
import { GLOBAL_ERROR_TEXT } from '../core/constants';
import { IAddress, IUserExternal, IUserProfile } from '../core/interfaces';
import { AddressErrors } from '../core/types';

export class UserStore implements IUserStore {
    rootStore: IRootStore;

    user: IUserProfile | undefined = undefined;

    userUpdated = false;

    error = '';

    registrationAddressError: AddressErrors | null = null;

    residentialAddressError: AddressErrors | null = null;

    referralLink = '';

    userExternal: IUserExternal | undefined = undefined;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.patchUserProfile = this.patchUserProfile.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setUserWasUpdated = this.setUserWasUpdated.bind(this);
        this.setUserProfileError = this.setUserProfileError.bind(this);
        this.setRegistrationAddressError = this.setRegistrationAddressError.bind(this);
        this.setResidentialAddressError = this.setResidentialAddressError.bind(this);
        this.fetchReferralLink = this.fetchReferralLink.bind(this);
        this.clearAddressErrors = this.clearAddressErrors.bind(this);
        this.clear = this.clear.bind(this);

        makeAutoObservable(this, undefined, { autoBind: true });
    }

    setUser(user: IUserProfile) {
        this.user = user;
    }

    async patchUserProfile(data: Partial<IUserProfile>) {
        try {
            const { status, message, errors } = await patchUserProfile(data);

            if (status === 200) {
                const userResponse = await getUserProfile();

                if (userResponse.data) {
                    this.setUser(userResponse.data);
                    this.setUserWasUpdated(true);
                } else {
                    this.setUserProfileError(userResponse?.message || GLOBAL_ERROR_TEXT);
                }
            } else {
                if (errors) {
                    Object.keys(errors).forEach(key => {
                        if (key.includes('registration')) {
                            const formKey = key.replace('registration_', '');

                            //@ts-ignore
                            this.setRegistrationAddressError(formKey, errors[key].join(''));
                        } else if (key.includes('residential')) {
                            const formKey = key.replace('residential_', '');

                            //@ts-ignore
                            this.setResidentialAddressError(formKey, errors[key].join(''));
                        } else {
                            let err = '';

                            if (Array.isArray(errors[key])) {
                                //@ts-ignore
                                err += ' ' + errors[key].join(' ');
                            } else {
                                err += ' ' + errors[key];
                            }

                            this.setUserProfileError(err);
                        }
                    });
                } else {
                    this.setUserProfileError(message || GLOBAL_ERROR_TEXT);
                }
            }
        } catch (err) {
            this.setUserProfileError(GLOBAL_ERROR_TEXT);
        }
    }

    setUserWasUpdated(value: boolean) {
        this.userUpdated = value;
    }

    setUserProfileError(error: string) {
        this.error = error;
    }

    setRegistrationAddressError(key: string, error: string) {
        if (this.registrationAddressError) {
            this.registrationAddressError[key as keyof IAddress] = error;
        } else {
            this.registrationAddressError = { [key]: error };
        }
    }

    setResidentialAddressError(key: string, error: string) {
        if (this.residentialAddressError) {
            this.residentialAddressError[key as keyof IAddress] = error;
        } else {
            this.residentialAddressError = { [key]: error };
        }
    }

    async fetchReferralLink() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getUserReferralLink();

            if (data) {
                this.setReferralLink(data.link);
            }
        } catch (e) {
            this.setReferralLink('');
        } finally {
            setLoading(false);
        }
    }

    setReferralLink(link: string) {
        this.referralLink = link;
    }

    clearAddressErrors() {
        this.registrationAddressError = null;
        this.residentialAddressError = null;
    }

    clear() {
        this.user = undefined;
        this.userUpdated = false;
        this.error = '';
        this.registrationAddressError = null;
        this.residentialAddressError = null;
    }

    isTestUser() {
        return this.user?.userGroup === 13;
    }

    getExternalUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await getUserExternal();

                if (!data) {
                    reject(false);

                    return;
                }
                this.userExternal = data;
                resolve(true);
            } catch (e) {
                reject(false);
            }
        });
    }
}
