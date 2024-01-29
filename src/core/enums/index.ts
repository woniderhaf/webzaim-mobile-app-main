export enum LoanRequestStatus {
    APPROVED = 'approved',
    PENDING_APPROVAL = 'pendingApproval',
    REJECTED = 'rejected',
    WAITING = 'waitingUserConfirmation'
}

export enum LoanLender {
    WEBZAIM = 'webzaim',
    BEEON = 'beeon'
}

export enum IPaymentMethodType {
    CARD = 'card',
    BANK = 'bank',
    POST = 'post',
    CASH = 'cash'
}

export enum MoneyTransferType {
    CARD = 'card',
    BANK_ACCOUNT = 'bankAccount'
}

export enum FastLoginActions {
    CREATE = 'create',
    ENTER = 'enter',
    CHANGE = 'change'
}

export enum FastLoginStep {
    CHANGE = 'change',
    CREATE = 'create',
    REPEAT = 'repeat',
    ENTER = 'enter'
}

export enum SmsConfirmationTypes {
    REQUEST = 'request',
    PROLONGATION = 'prolongation',
    REGISTRATION = 'registration'
}

export enum ThesaurusTypes {
    EDUCATION = 'education',
    INDUSTRU_SECTOR = 'industrySector',
    MATERIAL_STATUS = 'maritalStatus',
    INCOME = 'income',
    SBP_BANK = 'sbpBank',
    USER_REG_ADDRESSS = 'userRegistrationAddress',
    USER_RES_ADDRESSS = 'userResidentialAddress'
}

export enum PROFILE_FORM {
    ADDITIONAL_PHONE = 'additionalPhoneNumber',
    EDUCATION = 'education',
    INCOME = 'income',
    MATERIAL_STATUS = 'maritalStatus',

    ADDRESS_REGISTRATION = 'addressRegistration',
    ADDRESS_RESIDENTIAL = 'addressResidential',

    ADDRESS_REG_REGION = 'registrationAddressRegion',
    ADDRESS_REG_CITY = 'registrationAddressCity',
    ADDRESS_REG_STREET = 'registrationAddressStreet',
    ADDRESS_REG_HOUSE = 'registrationAddressHouse',
    ADDRESS_REG_FLAT = 'registrationAddressFlat',

    ADDRESS_RES_REGION = 'residentialAddressRegion',
    ADDRESS_RES_CITY = 'residentialAddressCity',
    ADDRESS_RES_STREET = 'residentialAddressStreet',
    ADDRESS_RES_HOUSE = 'residentialAddressHouse',
    ADDRESS_RES_FLAT = 'residentialAddressFlat'
}

export enum REG_FORM {
    NAME = 'name',
    SURNAME = 'surname',
    PATRONYMIC = 'patronymic',
    BIRTHDATE = 'birthDate',
    PHONE = 'phoneNumber',
    EMAIL = 'email',
    PASSWORD = 'password'
}

export enum REG_PASSPORT_FORM {
    NUMBER = 'number',
    ISSUE_DATE = 'issueDate',
    SUBUNIT_CODE = 'subunitCode',
    ISSUER = 'issuer',
    BIRTH_PLACE = 'birthPlace'
}

export enum ADDRESS_FORM {
    REGION = 'region',
    CITY = 'city',
    STREET = 'street',
    HOUSE = 'house',
    FLAT = 'flat'
}

export enum ButtonApperiance {
    INFO = 'info',
    TRANSPARENT = 'transparent',
    SECONDARY = 'secondary',
    GRAY = 'gray',
    WHITE = 'white'
}

export enum HIstoryItemStatusTypes {
    WAITING_USER_CONFIRMATION = 'waitingUserConfirmation', // заявка подана, но не подтверждена по СМС
    PENDING_APPROVAL = 'pendingApproval', // заявка подтверждена по СМС, но пока не одобрена
    APPROVED = 'approved', // заявка одобрена, показать основной экран с информацией о займе
    REJECTED = 'rejected', // заявка отклонена, необходимо ждать 30 дней
    CANCELLED = 'cancelled', // заявка отменена, но можно сразу оформить новую
    REPAID = 'repaid' // кредит погашен
}

export enum DadataSearchTypes {
    REGION = 'region',
    CITY = 'city',
    STREET = 'street',
    HOUSE = 'house'
}

export enum DadataFIOTypes {
    SURNAME = 'SURNAME',
    NAME = 'NAME',
    PATRONYMIC = 'PATRONYMIC'
}
export enum UserAppealsStatus {
    COMPLETED = 'completed'
}

// типы полей Обращений:
export enum AppealFormFieldType {
    // 'text' - однострочное текстовое поле (тип значения - string)
    TEXT = 'text',
    // 'textarea' - многострочное текстовое поле (тип значения - string)
    TEXTAREA = 'textarea',
    // 'loanSelect' - выбор договора займа (тип значения - number)
    LOAN_SELECT = 'loanSelect',
    // 'bankAccountNumber' - поле ввода номера банковского счета (тип значения - string)
    BANK_ACCOUNT_NUMBER = 'bankAccountNumber',
    // 'passportMainPage' - поле для загрузки скана паспорта с фото (тип значения - string)
    PASSPORT_MAIN_PAGE = 'passportMainPage',
    // 'passportRegistrationPage' - поле для загрузки скана паспорта с пропиской (тип значения - string)
    PASSPORT_REGISTRATION_PAGE = 'passportRegistrationPage',
    // 'passportSelfie' - поле для загрузки селфи с паспортом (тип значения - string)
    PASSPORT_SELFIE = 'passportSelfie',
    // 'files' - поле для загрузки произвольных файлов (тип значения - string[] - массив айдишек)
    FIELS = 'files',
    // 'email' - поле ввода email (тип значения - string)
    EMAIL = 'email',
    // 'userEmail' - поле ввода email, которое по умолчанию заполнится адресом текущего пользователя (тип значения - string)
    USER_EMAIL = 'userEmail',
    // 'refundMethodSelect' - ВИДЖЕТ выбора метода возврата - СБП или банк (описание ниже)
    // Виджет 'refundMethodSelect' добавляет в запрос создания обращения следующие поля:
    // "{name}_method": "sbp" | "bank" // выбранный метод
    // "{name}_sbpBank": id // выбранный банк для СБП (если "method" == "sbp"), идентификатор из словаря (thesaurus) 'sbpBank'
    // "{name}_accountOwnerPhone": string // номер телефона в формате +79xxxxxxxxx (если "method" == "sbp")
    // "{name}_bankBic": string // БИК банка (если "method" == "bank")
    // "{name}_bankName": string // наименование банка (если "method" == "bank")
    // "{name}_bankCorrespondentAccount": string // корр. счет банка (если "method" == "bank")
    // "{name}_accountOwnerName": string // ФИО владельца счета (если "method" == "bank")
    REFUND_METHOD_SELECT = 'refundMethodSelect', // @deprecated
    // 'bankBic' - ВИДЖЕТ для ввода БИК банка (описание ниже)
    // Виджет 'bankBic' добавляет в запрос создания обращения следующие поля:
    // "{name}_bankBic": string // БИК банка
    // "{name}_bankName": string // наименование банка
    // "{name}_bankCorrespondentAccount": string // корр. счет банка
    // {name} - это переданное имя поля (groups.fields.name), используется в качестве префикса
    BANK_BIC = 'bankBic'
}

export enum RegistrationType {
    MANUAL = 'manual',
    ESIA = 'esia',
    TINKOFF = 'tinkoff',
    PASSPORT_SCAN = 'passportScan'
}

export enum PassportsPage {
    MAIN_PAGE = 'mainPage',
    REGISTRATION_PAGE = 'registrationPage',
    SELFIE = 'selfie'
}
