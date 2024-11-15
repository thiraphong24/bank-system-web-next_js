import { Button, Col, InputField, Card, PanelContent, Row } from "@/components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, withRouter } from "next/router";
import axiosInstance from "@/libs/axiosInstance";
import useBalance from "@/hooks/useBalance";
import Swal from "sweetalert2";

const defaultValue: DepositWithdrawModel = {
    accountid: 0,
    transactiontype: '',
    amount: 0
};

const Withdraw = (props: any) => {
    const { setBalance } = useBalance();
    const [accountID, setAccountID] = useState<Number>(0);
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty, isValid }
    } = useForm({
        mode: "onChange",
        defaultValues: defaultValue
    });

    useEffect(() => {
        const json = localStorage.getItem('userData') || '';
        if (json) {
            const userData = JSON.parse(json);
            if (userData) {
                setAccountID(Number(userData.accountID))
            }
        }
    }, [])

    const onSubmit = async (data: DepositWithdrawModel) => {
        console.log('data', data);

        try {
            const response = await axiosInstance.post('/transaction/withdraw', {
                "accountid": accountID,
                "transactiontype": "withdraw",
                "amount": data.amount
            });

            console.log(response.data)
            if (response.status == 200) {
                setBalance(parseFloat(response.data.remain))
                router.push('/deposit-withdraw-history');
            }
        } catch (err) {
            const errData = (err as any)?.response?.data;

            Swal.fire({
                text: `${errData?.errCode} : ${errData?.errMsg}`,
                icon: "warning",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    return (
        <PanelContent
            title="Withdraw"
            menu="My Account"
            submenu="Withdraw Process"
            headerContent
        >
            <div className="login-box container" style={{ marginTop: "10%" }}>
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <div className="h1">
                            <b>MONEY IS NOT SAVING</b>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputField
                                label="Amount"
                                name="amount"
                                type="number"
                                register={register("amount", {
                                    required: 'Amount is required.',
                                    maxLength: {
                                        value: 24,
                                        message: 'Max amount is 24 digits.'
                                    }
                                })}
                                iconFormGroup="fa fa-cubes"
                                formGroup
                                errors={errors?.amount}
                                placeholder="Fill Amount"
                            />
                            <Row>
                                <Col size="12">
                                    <Button
                                        loading
                                        disabled={!isDirty || !isValid}
                                        textLoading="Waiting"
                                        type="submit"
                                        color="primary"
                                        block
                                        title="Withdraw"
                                    />
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        </PanelContent>
    );
};

export default withRouter(Withdraw);

