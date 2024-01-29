import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { CircleProgress } from '../../ui';
import { IRegistrationStep, RegistrationStepsMap } from '../../index';
import styles from './styles';

type RegistrationHeaderProps = {
    step: IRegistrationStep;
    steps: RegistrationStepsMap;
    bottomPadding?: number;
};

const RegistrationHeader = ({ step, steps, bottomPadding }: RegistrationHeaderProps) => {
    const stepsIdList = Object.keys(steps).filter(key => steps[key].step > 0 && steps[key].step % 1 === 0);
    const percentComplete = Math.round((step.step * 100) / stepsIdList.length);

    const renderDots = useMemo(() => {
        return (
            <View style={styles.dots}>
                {stepsIdList.map((key, index) => {
                    const isActive = key === step.id;

                    return (
                        <View key={String(index)} style={[styles.dotContainer, isActive && styles.dotContainerActive]}>
                            <View style={[styles.dot, isActive && styles.dotActive]} />
                        </View>
                    );
                })}
            </View>
        );
    }, [step, stepsIdList]);

    const renderCircle = useMemo(
        () => (
            <CircleProgress
                activeColor={'#00E5B9'}
                passiveColor={'#497bcb'}
                baseColor={'#fff'}
                width={6}
                done={percentComplete}
                radius={28}
                duration={800}
            >
                <Text style={styles.progress}>
                    {step.step}/{stepsIdList.length}
                </Text>
            </CircleProgress>
        ),
        [percentComplete]
    );

    return (
        <View
            style={[
                styles.registrationHeaderContainer,
                {
                    paddingBottom: bottomPadding
                        ? Math.abs(bottomPadding)
                        : styles.registrationHeaderContainer.paddingHorizontal
                }
            ]}
        >
            <View style={styles.registrationHeaderContainerw}>
                <View style={styles.registrationHeader}>
                    <View>{renderCircle}</View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{step.title}</Text>
                    </View>
                </View>
                {renderDots}
            </View>
        </View>
    );
};

export default observer(RegistrationHeader);
