import React, { useMemo } from 'react';
import { Image } from 'react-native';

const Star = require('./images/star.png');
const StarActive = require('./images/star--active.png');
const History = require('./images/history.png');
const HistoryActive = require('./images/history--active.png');
const Zaim = require('./images/zaim.png');
const ZaimActive = require('./images/zaim--active.png');
const Profile = require('./images/profile.png');
const ProfileActive = require('./images/profile--active.png');
const More = require('./images/more.png');
const MoreActive = require('./images/more--active.png');
const ArrowLeft = require('./images/arrow-left.png');
const ArrowLeftContrast = require('./images/arrow-left--contrast.png');
const Clock = require('./images/clock.png');
const ClockGray = require('./images/clock--gray.png');
const ClockPlus = require('./images/clock-plus.png');
const Phone = require('./images/phone.png');
const PhoneContrast = require('./images/phone--contrast.png');
const Menu = require('./images/menu.png');
const MenuContrast = require('./images/menu--contrast.png');
const Backspace = require('./images/backspace.png');
const FaceId = require('./images/faceid.png');
const Fingerprint = require('./images/fingerprint.png');
const Checkbox = require('./images/checkbox.png');
const CheckboxActive = require('./images/checkbox--active.png');
const CheckboxDisabled = require('./images/checkbox--disabled.png');
const CheckboxDisabledActive = require('./images/checkbox--disabled-active.png');
const Eye = require('./images/eye.png');
const EyeBlue = require('./images/eye--blue.png');
const AngleRight = require('./images/angle-right.png');
const AngleLeft = require('./images/angle-left.png');
const AngleUp = require('./images/angle-up.png');
const AngleDown = require('./images/angle-down.png');
const Warning = require('./images/warning.png');
const WarningOrange = require('./images/warning--orange.png');
const Alert = require('./images/alert.png');
const DocumentCircle = require('./images/document-circle.png');
const Download = require('./images/download.png');
const Insurance = require('./images/insurance.png');
const LegalAid = require('./images/legalAid.png');
const Giftcard = require('./images/giftcard.png');
const Trash = require('./images/trash.png');
const Telemedicine = require('./images/telemedicine.png');
const Fb = require('./images/fb.png');
const Vk = require('./images/vk.png');
const Instagram = require('./images/instagram.png');
const AppIcon = require('./images/app-icon.png');
const RadioInput = require('./images/radio-input.png');
const RadioInputActive = require('./images/radio-input--active.png');
const Attachment = require('./images/attachment.png');
const Question = require('./images/question.png');
const Check = require('./images/check.png');
const Copy = require('./images/copy.png');
const GreenCircleCheck = require('./images/green-circle-check.png');
const ErrorOrange = require('./images/error-orange.png');
const CirclePencil = require('./images/circle-pencil.png');
const CircleDocScan = require('./images/circle-doc-scan.png');
const CircleTinkoff = require('./images/circle-tinkoff.png');
const CircleEsia = require('./images/circle-esia.png');
const Like = require('./images/like.png');

const ICONS: Record<string, any> = {
    attachment: Attachment,
    arrowLeft: ArrowLeft,
    arrowLeftContrast: ArrowLeftContrast,
    sales: Star,
    salesActive: StarActive,
    history: History,
    historyActive: HistoryActive,
    zaim: Zaim,
    zaimActive: ZaimActive,
    profile: Profile,
    profileActive: ProfileActive,
    other: More,
    otherActive: MoreActive,
    clock: Clock,
    clockGray: ClockGray,
    clockPlus: ClockPlus,
    phone: Phone,
    phoneContrast: PhoneContrast,
    menu: Menu,
    menuContrast: MenuContrast,
    backspace: Backspace,
    faceid: FaceId,
    fingerprint: Fingerprint,
    checkbox: Checkbox,
    checkboxActive: CheckboxActive,
    checkboxDisabled: CheckboxDisabled,
    checkboxDisabledActive: CheckboxDisabledActive,
    eye: Eye,
    eyeBlue: EyeBlue,
    angleRight: AngleRight,
    angleLeft: AngleLeft,
    angleUp: AngleUp,
    angleDown: AngleDown,
    warning: Warning,
    warningOrange: WarningOrange,
    alert: Alert,
    documentCircle: DocumentCircle,
    download: Download,
    insurance: Insurance,
    legalAid: LegalAid,
    giftcard: Giftcard,
    trash: Trash,
    telemedicine: Telemedicine,
    fb: Fb,
    vk: Vk,
    instagram: Instagram,
    appIcon: AppIcon,
    radioInput: RadioInput,
    radioInputActive: RadioInputActive,
    question: Question,
    check: Check,
    copy: Copy,
    greenCircleCheck: GreenCircleCheck,
    errorOrange: ErrorOrange,
    circlePencil: CirclePencil,
    circleDocScan: CircleDocScan,
    circleTinkoff: CircleTinkoff,
    circleEsia: CircleEsia,
    like: Like
};

export type IconProps = {
    name: keyof typeof ICONS;
    size: number;
};

export const Icon = ({ name, size }: IconProps) => {
    const icon = ICONS[name];

    if (!icon) {
        return null;
    }

    return useMemo(() => <Image source={icon} style={{ width: size, height: size }} />, [icon, size]);
};
