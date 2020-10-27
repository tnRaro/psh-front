import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Stack,
    Checkbox,
    Divider
} from "@chakra-ui/core";
import AgreementCheckbox from "./AgreementCheckbox";

type AgreementItems = {
    id: string;
    url?: string;
    message: string;
    isRequired: boolean;
    isChecked: boolean;
};

const Form = () => {
    const { handleSubmit, errors, register, formState, watch } = useForm();

    const [agreementItems, setAgreementItems] = useState<AgreementItems[]>([
        {
            id: "agreement-0",
            message: "만 14세 이상입니다.",
            isRequired: true,
            isChecked: false,
        },
        {
            id: "agreement-1",
            url: "/usepolicy",
            message: "이용약관",
            isRequired: true,
            isChecked: false,
        },
        {
            id: "agreement-2",
            url: "/privacy",
            message: "개인정보처리방침",
            isRequired: true,
            isChecked: false,
        },
        {
            id: "agreement-3",
            message: "이벤트, 프로모션 알림 메일 및 뿌테 초대 수신",
            isRequired: false,
            isChecked: false,
        }
    ]);

    const onChangeAgreementItem = (e: ChangeEvent<HTMLInputElement>) => {
        setAgreementItems(agreementItems.map(item => {
            if (item.id === e.target.name) {
                return {
                    ...item,
                    isChecked: e.target.checked
                };
            }
            return item;
        }));
    }

    const onChangeAllAgreementItemsChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setAgreementItems(agreementItems.map(item => {
            return {
                ...item,
                isChecked: e.target.checked
            };
        }));
    }

    const allAgreementItemsChecked = agreementItems.every(item => item.isChecked);

    const password = useRef({});
    password.current = watch("password", "");

    const validatePasswordMatch = (value: string) => {
        return value === password.current || "비밀번호가 일치하지 않습니다.";
    }

    const onSubmit = (values: any) => {
        // TODO
        console.log(values);
    }

    return <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl mt="1em" isInvalid={errors.email} isRequired>
            <FormLabel htmlFor="email">이메일</FormLabel>
            <FormHelperText id="email-helper-text">
                본인 확인을 위한 이메일을 입력해주세요.
            </FormHelperText>
            <Input
                name="email"
                aria-describedby="email-helper-text"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "올바른 이메일을 입력해주세요."
                    }
                })}
                placeholder="이메일"/>
            <FormErrorMessage>
                {errors.email && errors.email.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl mt="1em" isInvalid={errors.password} isRequired>
            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <FormHelperText id="password-helper-text">
                8자 이상 입력해주세요.
            </FormHelperText>
            <Input
                type="password"
                name="password"
                aria-describedby="password-helper-text"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    minLength: {
                        value: 8,
                        message: "8자 이상 입력해주세요."
                    }
                })}
                placeholder="비밀번호"/>
            <FormErrorMessage>
                {errors.password && errors.password.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl mt="1em" isInvalid={errors.password2} isRequired>
            <FormLabel htmlFor="password2">비밀번호 확인</FormLabel>
            <Input
                type="password"
                name="password2"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    validate: validatePasswordMatch
                })}
                placeholder="비밀번호 확인"/>
            <FormErrorMessage>
                {errors.password2 && errors.password2.message}
            </FormErrorMessage>
        </FormControl>
        <FormControl mt="1em" isInvalid={errors.nickname} isRequired>
            <FormLabel htmlFor="nickname">별명</FormLabel>
            <Input
                name="nickname"
                ref={register({
                    required: {
                        value: true,
                        message: "필수 입력 항목입니다."
                    },
                    minLength: {
                        value: 2,
                        message: "별명은 2자 이싱으로 설정해주세요."
                    },
                    maxLength: {
                        value: 53,
                        message: "별명은 53자 이하로 설정해주세요."
                    }
                })}
                placeholder="별명 (2-53자)"/>
                <FormErrorMessage>
                    {errors.nickname && errors.nickname.message}
                </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={agreementItems.some(item => item.isRequired && !item.isChecked)} isRequired>
            <FormLabel htmlFor="agreement">약관 동의</FormLabel>
            <Stack border="1px" borderRadius="md" borderColor="gray.200" p="1em" mt="1em">
                <Checkbox
                    isChecked={allAgreementItemsChecked}
                    onChange={onChangeAllAgreementItemsChecked}>
                    전체동의
                </Checkbox>
                <Divider />
                {agreementItems.map(item => {
                    return <AgreementCheckbox
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        message={item.message}
                        isRequired={item.isRequired}
                        isChecked={item.isChecked}
                        onChange={onChangeAgreementItem}
                        register={register}
                    />;
                })}
            </Stack>
            <FormErrorMessage>
                {formState.isValid || "필수 선택 항목입니다."}
            </FormErrorMessage>
        </FormControl>
        <Button
            mt={4}
            variantColor="blue"
            isLoading={formState.isSubmitting}
            type="submit"
            fontWeight="normal">
            회원가입
        </Button>
    </form>;
}

export default Form;