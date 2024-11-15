import { balanceState } from "@/recoil/balanceAtom"
import { useRecoilState } from "recoil"

const useBalance = () => {
    const [balance, setBalance] = useRecoilState(balanceState)

    return {
        balance,
        setBalance
    }
}
export default useBalance