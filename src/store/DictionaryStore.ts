import { makeAutoObservable, runInAction } from 'mobx';
import { IRootStore, IDictionaryStore, IDictionary, ITranslate } from '../core';
import { getThesaurus, postFindAddressById } from '../core/api';
import { ThesaurusTypes } from '../core/enums';
import { IAddress, IUserAddress } from '../core/interfaces';
import { DadataAddressResponse } from '../core/types';

export class DictionaryStore implements IDictionaryStore {
    rootStore: IRootStore;

    loading = false;

    dictionary: IDictionary | null = null;

    userAddresses: Record<string | number, { region: string, city: string }> = {};

    addresses: Record<string, IAddress> = {};

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.fetchDictionary = this.fetchDictionary.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.getTranslate = this.getTranslate.bind(this);
        this.getOptions = this.getOptions.bind(this);

        makeAutoObservable(this);
    }

    async fetchDictionary() {
        const { user } = this.rootStore.userStore;

        const userRegCityKladrId = user?.registrationAddress.cityKladrId;
        const userResCityKladrId = user?.residentialAddress.cityKladrId;

        this.setLoading(true);

        try {
            const promises = [
                getThesaurus(ThesaurusTypes.EDUCATION),
                getThesaurus(ThesaurusTypes.INCOME),
                getThesaurus(ThesaurusTypes.MATERIAL_STATUS)
            ];

            if (userRegCityKladrId) {
                promises.push(postFindAddressById(userRegCityKladrId));
            }

            if (userResCityKladrId) {
                promises.push(postFindAddressById(userResCityKladrId));
            }

            const [
                $education,
                $income,
                $materialStatus,
                $userRegCityKladrId,
                $userResCityKladrId
            ] = await Promise.all(promises);

            runInAction(() => {
                this.dictionary = {
                    [ThesaurusTypes.EDUCATION]: $education.data,
                    [ThesaurusTypes.INCOME]: $income.data,
                    [ThesaurusTypes.MATERIAL_STATUS]: $materialStatus.data
                };

                if (userRegCityKladrId) {
                    this.addresses.registration = this.createAddress(
                        user.registrationAddress,
                        $userRegCityKladrId?.data
                    );
                }

                if (userResCityKladrId) {
                    this.addresses.residential = this.createAddress(user.residentialAddress, $userResCityKladrId?.data);
                }
            });
        } finally {
            this.setLoading(false);
        }
    }

    createAddress(userAddress: IUserAddress, dadata: DadataAddressResponse): IAddress {
        const { street, house, flat, postalCode, cityKladrId } = userAddress;
        const { region, city, settlement } = dadata?.suggestions[0]?.data || {};

        return {
            cityKladrId: cityKladrId || '',
            region: region || '',
            city: settlement || city || '',
            street: street || '',
            house: house || '',
            flat: flat || '',
            postalCode: postalCode || ''
        };
    }

    setLoading(value: boolean) {
        this.loading = value;
    }

    getTranslate(value: string, type: ThesaurusTypes): ITranslate | undefined {
        if (this.dictionary && this.dictionary[type]) {
            return this.dictionary[type]?.find((variant) => variant.id === value);
        }

        return undefined;
    }

    getOptions(type: ThesaurusTypes): Array<ITranslate> {
        let options:Array<ITranslate> = [];

        if (this.dictionary) {
            options = this.dictionary[type] ?? [];
        }

        return options;
    }

    clear() {
        this.userAddresses = {};
        this.dictionary = null;
    }
}
