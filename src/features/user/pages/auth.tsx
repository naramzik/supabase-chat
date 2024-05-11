import { useState } from "react";
import { useCreateUserMutation } from "@/features/user/queries/useCreateUserMutation";
import { useLoginUserMutation } from "@/features/user/queries/useLoginUserMutation";

export default function Page() {
  const { mutate: loginUser } = useLoginUserMutation();
  const { mutate: createUser } = useCreateUserMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">로그인하기</h1>

        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={() => loginUser({ email, password })}
        >
          로그인하기
        </button>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">회원가입하기</h1>

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="유저이름을 입력해주세요."
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={() => createUser({ username, email, password })}
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}
