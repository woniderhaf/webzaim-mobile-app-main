import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { OtherStackScreenProps, ROUTES } from '../../../../navigation';
import { useCommonStore, useUIStore } from '../../../../store';
import { LoanRequestButton, HtmlView, PostDate, PostImage } from '../../../../core/components';
import locale from './locale';
import styles from './styles';

const PostScreen = () => {
    const route = useRoute<OtherStackScreenProps<ROUTES.POST>['route']>();
    const { id } = route.params;
    const { post, fetchPost, setPost } = useCommonStore();
    const { loading } = useUIStore();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await fetchPost(id);
            })();

            return () => setPost(null);
        }, [id])
    );

    const renderContent = useMemo(() => {
        if (!post) {
            return null;
        }

        return (
            <View style={styles.container}>
                {post.mainImage && (
                    <PostImage
                        url={post.mainImage.image.url}
                        width={post.mainImage.image.width}
                        height={post.mainImage.image.height}
                    />
                )}
                <PostDate value={post.date} />
                <Text style={styles.postTitle}>{post.title}</Text>
                {post.blocks.map((block) => (
                    block.image
                        ? <PostImage
                            key={block.id}
                            url={block.image.url}
                            width={block.image.width}
                            height={block.image.height}
                        />
                        : <HtmlView
                            key={block.id}
                            html={block.text || ''}
                        />
                ))}
                <LoanRequestButton />
            </View>
        );
    }, [post]);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                {!loading && renderContent}
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(PostScreen);
