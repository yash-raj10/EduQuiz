// import mongoose from "mongoose";
import {
  ethers,
  JsonRpcProvider,
} from "./node_modules/ethers/dist/ethers.umd.js";

const TursoKEY = fleek.env.TURSO_KEY;
const privateKey = fleek.env.PRIVATE_KEY;

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "score",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ScoreAdded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_score", type: "uint256" },
      { internalType: "address", name: "_player", type: "address" },
    ],
    name: "addScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLeaderboard",
    outputs: [
      {
        components: [
          { internalType: "address", name: "playerAddress", type: "address" },
          { internalType: "uint256", name: "score", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct QuizLeaderboard.PlayerScore[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLeaderboardWithScores",
    outputs: [
      {
        components: [
          { internalType: "address", name: "playerAddress", type: "address" },
          { internalType: "uint256", name: "score", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct QuizLeaderboard.PlayerScore[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "leaderboard",
    outputs: [
      { internalType: "address", name: "playerAddress", type: "address" },
      { internalType: "uint256", name: "score", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const bytecode =
  "6080604052348015600e575f80fd5b506108168061001c5f395ff3fe608060405234801561000f575f80fd5b506004361061004a575f3560e01c80630ae6d02b1461004e5780636d763a6e1461006a57806392c89ab214610088578063bf368399146100a6575b5f80fd5b6100686004803603810190610063919061054a565b6100d8565b005b6100726101de565b60405161007f919061068e565b60405180910390f35b6100906103a3565b60405161009d919061068e565b60405180910390f35b6100c060048036038101906100bb91906106ae565b610466565b6040516100cf939291906106f7565b60405180910390f35b5f60405180606001604052808373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200142815250908060018154018082558091505060019003905f5260205f2090600302015f909190919091505f820151815f015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015550503373ffffffffffffffffffffffffffffffffffffffff167f83534a5108af10022a80fb6f89749ec76d5d14ac730fc855e712bf8b0886100483426040516101d292919061072c565b60405180910390a25050565b60605f80805480602002602001604051908101604052809291908181526020015f905b82821015610299578382905f5260205f2090600302016040518060600160405290815f82015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152505081526020019060010190610201565b5050505090505f5b815181101561039b575f6001826102b89190610780565b90505b825181101561038d578281815181106102d7576102d66107b3565b5b6020026020010151602001518383815181106102f6576102f56107b3565b5b6020026020010151602001511015610380575f83838151811061031c5761031b6107b3565b5b60200260200101519050838281518110610339576103386107b3565b5b6020026020010151848481518110610354576103536107b3565b5b602002602001018190525080848381518110610373576103726107b3565b5b6020026020010181905250505b80806001019150506102bb565b5080806001019150506102a1565b508091505090565b60605f805480602002602001604051908101604052809291908181526020015f905b8282101561045d578382905f5260205f2090600302016040518060600160405290815f82015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481525050815260200190600101906103c5565b50505050905090565b5f8181548110610474575f80fd5b905f5260205f2090600302015f91509050805f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b5f80fd5b5f819050919050565b6104cf816104bd565b81146104d9575f80fd5b50565b5f813590506104ea816104c6565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610519826104f0565b9050919050565b6105298161050f565b8114610533575f80fd5b50565b5f8135905061054481610520565b92915050565b5f80604083850312156105605761055f6104b9565b5b5f61056d858286016104dc565b925050602061057e85828601610536565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6105ba8161050f565b82525050565b6105c9816104bd565b82525050565b606082015f8201516105e35f8501826105b1565b5060208201516105f660208501826105c0565b50604082015161060960408501826105c0565b50505050565b5f61061a83836105cf565b60608301905092915050565b5f602082019050919050565b5f61063c82610588565b6106468185610592565b9350610651836105a2565b805f5b83811015610681578151610668888261060f565b975061067383610626565b925050600181019050610654565b5085935050505092915050565b5f6020820190508181035f8301526106a68184610632565b905092915050565b5f602082840312156106c3576106c26104b9565b5b5f6106d0848285016104dc565b91505092915050565b6106e28161050f565b82525050565b6106f1816104bd565b82525050565b5f60608201905061070a5f8301866106d9565b61071760208301856106e8565b61072460408301846106e8565b949350505050565b5f60408201905061073f5f8301856106e8565b61074c60208301846106e8565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61078a826104bd565b9150610795836104bd565b92508282019050808211156107ad576107ac610753565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffdfea2646970667358221220a5c0912086074cf5b446b868f9112d843270331105be4adf29d0733bf2d7be9664736f6c634300081a0033";
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function deployContract() {
  const provider = new JsonRpcProvider("https://testnet.hashio.io/api");

  const wallet = new ethers.Wallet(privateKey, provider);

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  try {
    const Quizcontract = await factory.deploy();
    // await Quizcontract.deployed();
    console.log("Contract deployed to:", Quizcontract.target);
    return Quizcontract.target;
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

async function save_question(body) {
  // return addre;
  const quiz_data = btoa(JSON.stringify(body.quiz_data));
  const owner = body.user_address;
  if(!owner) {
    return {error: "user_address is required"}
  }
  const quiz_name = body.quiz_name;
  const quiz_description = body.quiz_description;
  console.log(quiz_data);
  const quiz_id = makeid(10);
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `CREATE TABLE IF NOT EXISTS hedera_quiz (
          id PRIMARY KEY,
          owner TEXT,
          quiz_name TEXT,
          quiz_description TEXT,
          quiz_data TEXT,undefined
          contract_Address TEXT
        )`,
        },
      },
      {
        type: "execute",
        stmt: {
          sql: `INSERT INTO hedera_quiz (id, owner, quiz_name, quiz_description, quiz_data) VALUES ('${quiz_id}' ,'${owner}', '${quiz_name}', '${quiz_description}', "${quiz_data}")`,
        },
      },
      { type: "close" },
    ],
  };
  console.log(payload.requests[1].stmt.sql);
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  const addre = await deployContract();

  // update the contract address in the database
  const payload2 = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `UPDATE hedera_quiz SET contract_Address = '${addre}' WHERE id = '${quiz_id}'`,
        },
      },
      { type: "close" },
    ],
  };
  const uri2 = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response2 = await fetch(uri2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload2),
  });

  return data.results[1];
}

async function get_quiz(body) {
  const quiz_id = body.quiz_id;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM quiz WHERE id = '${quiz_id}'`,
        },
      },
      { type: "close" },
    ],
  };
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  const quiz_data = JSON.parse(
    atob(data.results[0].response.result.rows[0][4].value)
  );

  for (let i = 0; i < quiz_data.length; i++) {
    delete quiz_data[i].answer;
    delete quiz_data[i].explanation;
  }

  const quiz = {
    quiz_name: data.results[0].response.result.rows[0][2].value,
    quiz_description: data.results[0].response.result.rows[0][3].value,
    quiz_data: quiz_data,
    owner: data.results[0].response.result.rows[0][1].value,
  };
  return quiz;
}

async function submit_attempt(body) {
  const quiz_id = body.quiz_id;
  const user_address = body.user_address;
  const answers = body.answers;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM quiz WHERE id = '${quiz_id}'`,
        },
      },
      { type: "close" },
    ],
  };
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  const quiz_data = JSON.parse(
    atob(data.results[0].response.result.rows[0][4].value)
  );

  let score = 0;
  const max_score = quiz_data.length;
  for (let i = 0; i < quiz_data.length; i++) {
    console.log(quiz_data[i].answer, answers[i]);
    if (quiz_data[i].answer === answers[i]) {
      score += 1;
    }
  }

  const attempt_id = makeid(10);
  const payload2 = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `CREATE TABLE IF NOT EXISTS attempts (
          id PRIMARY KEY,
          quiz_id TEXT,
          user_address TEXT,
          answers TEXT,
          score INT,
          max_score INT,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )`,
        },
      },
      {
        type: "execute",
        stmt: {
          sql: `INSERT INTO attempts (id, quiz_id, user_address, answers, score, max_score) VALUES ('${attempt_id}' ,'${quiz_id}', '${user_address}', '${JSON.stringify(
            answers
          )}', ${score}, ${max_score})`,
        },
      },
      { type: "close" },
    ],
  };

  const uri2 = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response2 = await fetch(uri2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload2),
  });
  // const data2 = await response2.json();
  // console.log(data2.results[1]);
  return { score: score, max_score: max_score };
}

async function get_user_quizes(body) {
  const user_address = body.user_address;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM quiz
          WHERE owner = '${user_address}'`,
        },
      },
      { type: "close" },
    ],
  };
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  const quizes = [];
  for (let i = 0; i < data.results[0].response.result.rows.length; i++) {
    quizes.push({
      quiz_name: data.results[0].response.result.rows[i][2].value,
      quiz_description: data.results[0].response.result.rows[i][3].value,
      quiz_id: data.results[0].response.result.rows[i][0].value,
    });
  }
  return quizes;
}

async function get_leaderboard(body) {
  // get the attempts ordered by score and timestamp
  const quiz_id = body.quiz_id;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM attempts WHERE quiz_id = '${quiz_id}' ORDER BY score DESC, timestamp ASC`,
        },
      },
      { type: "close" },
    ],
  };
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  const leaderboard = [];
  for (let i = 0; i < data.results[0].response.result.rows.length; i++) {
    leaderboard.push({
      user_address: data.results[0].response.result.rows[i][2].value,
      score: data.results[0].response.result.rows[i][4].value,
      max_score: data.results[0].response.result.rows[i][5].value,
      timestamp: data.results[0].response.result.rows[i][6].value,
    });
  }
  return leaderboard;
}

export const main = async (params) => {
  const { body, path } = params;
  switch (path) {
    case "/save_question":
      return save_question(body);
    case "/get_quiz":
      return get_quiz(body);
    case "/submit_attempt":
      return submit_attempt(body);
    case "/get_user_quizes":
      return get_user_quizes(body);
    case "/get_leaderboard":
      return get_leaderboard(body);
    default:
      return { error: "path not found" };
  }
};

save_question({});

// get_quiz({ quiz_id: "xL6qKKlXHx" });

// submit_attempt({
//   quiz_id: "KGetymyZMB",
//   user_address: "0x123",
//   answers: {
//     0: "a",
//     1: "runserver",
//   },
// });
