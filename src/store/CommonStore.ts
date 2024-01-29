import { makeAutoObservable } from 'mobx';
import { ICommonStore, IRootStore } from '../core';
import { getAbout, getAppDocuments, getFAQ, getNews, getPost, getPromotion, getPromotions } from '../core/api';
import { IAboutPage, IAppDocument, IFAQCategory, IPost, IPostPreview, IPromotion } from '../core/interfaces';

export class CommonStore implements ICommonStore {
    rootStore: IRootStore;

    about: IAboutPage | null = null;

    faq: Array<IFAQCategory> = [];

    documents: Array<IAppDocument> = [];

    news: Array<IPostPreview> = [];

    post: IPost | null = null;

    promotions: Array<IPromotion> = [];

    promotion: IPromotion | null = null;

    isNeedUpdateMethodPaymentList: boolean = false;

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;

        this.fetchAbout = this.fetchAbout.bind(this);
        this.fetchFAQ = this.fetchFAQ.bind(this);
        this.fetchDocuments = this.fetchDocuments.bind(this);
        this.fetchNews = this.fetchNews.bind(this);
        this.fetchPost = this.fetchPost.bind(this);
        this.fetchPromotions = this.fetchPromotions.bind(this);
        this.fetchPromotion = this.fetchPromotion.bind(this);
        this.setIsNeedUpdateMethodPaymentList = this.setIsNeedUpdateMethodPaymentList.bind(this);

        makeAutoObservable(this);
    }

    setAbout(data: IAboutPage) {
        this.about = data;
    }

    async fetchAbout() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getAbout();

            if (data) {
                this.setAbout(data);
            }
        } finally {
            setLoading(false);
        }
    }

    setFAQ(data: Array<IFAQCategory>) {
        this.faq = data;
    }

    async fetchFAQ() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getFAQ();

            if (data) {
                this.setFAQ(data.items);
            }
        } finally {
            setLoading(false);
        }
    }

    setDocuments(data: Array<IAppDocument>) {
        this.documents = data;
    }

    async fetchDocuments() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getAppDocuments();

            if (data) {
                this.setDocuments(data.items);
            }
        } finally {
            setLoading(false);
        }
    }

    setNews(data: Array<IPostPreview>) {
        this.news = [...this.news, ...data];
    }

    async fetchNews() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getNews();

            if (data) {
                const sortedData = data.sort(
                    (a: IPostPreview, b: IPostPreview) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                this.setNews(sortedData);
            }
        } finally {
            setLoading(false);
        }
    }

    setPost(data: IPost | null) {
        this.post = data;
    }

    async fetchPost(id: string) {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getPost(id);

            if (data) {
                this.setPost(data);
            }
        } finally {
            setLoading(false);
        }
    }

    async fetchPromotions() {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getPromotions();

            if (data) {
                this.setPromotions(data);
            }
        } finally {
            setLoading(false);
        }
    }

    setPromotions(data: Array<IPromotion>) {
        this.promotions = data;
    }

    async fetchPromotion(id: string) {
        const { setLoading } = this.rootStore.uiStore;

        setLoading(true);

        try {
            const { data } = await getPromotion(id);

            if (data) {
                this.setPromotion(data);
            }
        } finally {
            setLoading(false);
        }
    }

    setPromotion(data: IPromotion | null) {
        this.promotion = data;
    }

    setIsNeedUpdateMethodPaymentList(flag: boolean) {
        this.isNeedUpdateMethodPaymentList = flag;
    }
}
