import styled from "styled-components";

const CostContainor= styled.div`
    width:375px;
    height:800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: red;
    

    .title{
        width:343px;
        height:23px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: blue;
        p{
            color: #000;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%;
        }
    }

    .daysContainor{
        width:343px;
        height:18px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 19px;
        background-color: beige;
        p{
            color: #000;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 550;
            line-height: 150%; /* 21px */
        }

        .days{
            width:300px;
            height: 10px;
            margin-left: 10px;
            background-color: aqua;
        }

    }

    .logContainor{
            width:343px;
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            background-color: blue;

            .expenseItem{
                width:343px;
                height:46px;
                margin-top: 3px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 5px;
                box-sizing: border-box;
                background-color: #D9D9D9;
            }
        }
`
export function DayCost({expenses=[]}){
    console.log(expenses);
    return(
        <CostContainor>
            <div className="title">
                <p>일자별 지출</p>
            </div>

            <div className="daysContainor">
                <p>전체</p>
                <div className="days">

                </div>
            </div>

            <div className="logContainor">
                {expenses.map((expense, index) => (
                    <div className="expenseItem" key={index}>
                        <span className="expenseName">{expense.name}</span>
                        <span className="expenseAmount">{expense.amount.toLocaleString()}원</span>
                    </div>
                ))}
            </div>
        </CostContainor>
        
    );

}