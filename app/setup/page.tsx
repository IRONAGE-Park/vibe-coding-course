import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import CopyDoc from "../components/CopyDoc";
import StepRail from "../components/StepRail";
import { CLAUDE_MD } from "./claudeMd";
import {
  Blue,
  Callout,
  Ext,
  MiniSteps,
  PageHero,
  Pager,
  Shot,
  SiteFooter,
  StepCard,
  Term,
} from "../components/ui";

export const metadata: Metadata = {
  title: "01 환경 설정 | 바이브코딩과 함께 살아남기",
  description:
    "Node.js, Claude Code, GitHub, Git, Supabase, Vercel, Orca — 실습에 필요한 도구 7가지 설치와 가입.",
};

const TOTAL = 10;

const RAIL = [
  { id: "setup-1", num: "01", label: "Node.js" },
  { id: "setup-2", num: "02", label: "Claude Code" },
  { id: "setup-3", num: "03", label: "GitHub 가입" },
  { id: "setup-4", num: "04", label: "Git · GitHub CLI" },
  { id: "setup-5", num: "05", label: "Supabase" },
  { id: "setup-6", num: "06", label: "Vercel" },
  { id: "setup-7", num: "07", label: "Orca" },
  { id: "setup-check", num: "✓", label: "중간 점검" },
  { id: "setup-8", num: "08", label: "프로젝트 연결" },
  { id: "setup-9", num: "09", label: "Claude 열기" },
  { id: "setup-10", num: "10", label: "AI 가이드라인" },
];

/* 단계별 "잘 됐는지 확인" 블록 */
function Verify({
  command,
  label,
  lines,
}: {
  command: string;
  label?: string;
  lines: { prompt?: boolean; text: string; dim?: boolean }[];
}) {
  return (
    <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
      <p className="mb-3 flex items-center gap-2 text-[14.5px] font-extrabold">
        <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[var(--s2-blue)] text-[11px] font-black text-white">
          ✓
        </span>
        잘 됐는지 확인
      </p>
      <div className="flex flex-col gap-3">
        <CopyBlock label={label ?? "터미널에 붙여넣기"} command={command} />
        <Term title="실제 실행 결과 — 진행자 PC" lines={lines} />
      </div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="01"
        label="Chapter 01"
        title={
          <>
            <Blue>환경 설정</Blue> — 도구부터 갖추자
          </>
        }
        sub={
          <>
            일곱 가지를 설치·가입하고, 마지막에 실습 프로젝트를 만들어 Orca에
            연결합니다. 전부 무료이고 약 20분 — 이미 되어 있는 항목은
            건너뛰세요. 원칙은 하나, <b>계정은 GitHub 하나로 통일</b>.
          </>
        }
      />

      <StepRail items={RAIL} />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 1. Node.js */}
        <StepCard
          no={1}
          total={TOTAL}
          id="setup-1"
          title="Node.js 설치"
          tag="이미 설치돼 있다면 건너뛰기"
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/nodejs-download.png"
              width={1443}
              height={1922}
              alt="Node.js 다운로드 페이지"
              url="nodejs.org/ko/download"
              href="https://nodejs.org/ko/download"
              highlight={{
                top: "57%",
                left: "4.5%",
                width: "27%",
                height: "3.4%",
                label: "이 초록 버튼!",
              }}
              eager
            />
            <div className="flex flex-col gap-4">
              <MiniSteps
                items={[
                  <>
                    <Ext href="https://nodejs.org/ko/download">
                      nodejs.org/ko/download
                    </Ext>{" "}
                    접속 — 상단 Docker 안내는 무시합니다.
                  </>,
                  <>
                    아래로 내려 초록색 <b>Windows 설치 프로그램 (.msi)</b> 클릭.
                    맥은 운영 체제를 <b>macOS</b>로 바꾸면 <b>.pkg</b> 버튼이
                    됩니다.
                  </>,
                  <>
                    받은 파일 실행 후 <b>Next만 계속</b> 눌러 설치. 끝나면
                    터미널(Windows는 PowerShell)을 <b>새로</b> 여세요.
                  </>,
                ]}
              />
              <Verify
                command="node -v"
                lines={[
                  { prompt: true, text: "node -v" },
                  { text: "v24.14.1" },
                ]}
              />
            </div>
          </div>
        </StepCard>

        {/* 2. Claude Code */}
        <StepCard
          no={2}
          total={TOTAL}
          id="setup-2"
          title="Claude Code CLI 설치 + 로그인"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <CopyBlock
              label="Windows — PowerShell에 붙여넣기"
              command="irm https://claude.ai/install.ps1 | iex"
            />
            <CopyBlock
              label="macOS — 터미널에 붙여넣기"
              command="curl -fsSL https://claude.ai/install.sh | bash"
            />
          </div>
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/claude-code-quickstart.png"
              width={1443}
              height={1922}
              alt="Claude Code 빠른 시작 문서"
              url="code.claude.com/docs/ko/quickstart"
              href="https://code.claude.com/docs/ko/quickstart"
              highlight={{
                top: "89%",
                left: "2%",
                width: "96%",
                height: "4%",
                label: "Windows는 이 명령어",
              }}
            />
            <div className="flex flex-col gap-4">
              <MiniSteps
                items={[
                  <>
                    위 명령어를 붙여넣고 Enter — 공식 안내는{" "}
                    <Ext href="https://code.claude.com/docs/ko/quickstart">
                      빠른 시작 문서
                    </Ext>
                    에 있습니다.
                  </>,
                  <>
                    설치가 끝나면 터미널을 <b>새로</b> 열어 아래 확인만 하고
                    넘어갑니다.
                  </>,
                  <>
                    <b>실행과 로그인은 9단계</b>에서 Orca로 합니다 — 터미널에
                    명령어를 칠 일이 없습니다.
                  </>,
                ]}
              />
              <Verify
                command="claude --version"
                lines={[
                  { prompt: true, text: "claude --version" },
                  { text: "2.1.222 (Claude Code)" },
                ]}
              />
            </div>
          </div>
        </StepCard>

        {/* 3. GitHub */}
        <StepCard
          no={3}
          total={TOTAL}
          id="setup-3"
          title="GitHub 가입"
          tag="이미 계정이 있다면 건너뛰기"
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/github-signup.png"
              width={1443}
              height={1922}
              alt="GitHub 회원가입 화면"
              url="github.com/signup"
              href="https://github.com/signup"
              highlight={{
                top: "78.4%",
                left: "26%",
                width: "48%",
                height: "3.6%",
                label: "입력 후 여기",
              }}
            />
            <div className="flex flex-col gap-4">
              <MiniSteps
                items={[
                  <>
                    <Ext href="https://github.com/signup">
                      github.com/signup
                    </Ext>{" "}
                    에서 Email · Password · Username 입력.
                  </>,
                  <>
                    <b>Create account</b> → 메일로 온 <b>인증 코드</b> 입력하면
                    완료.
                  </>,
                ]}
              />
              <Callout title="Username은 신중하게">
                <span className="font-mono text-[12.5px]">
                  github.com/아이디
                </span>
                가 포트폴리오 주소가 됩니다 — 이름 기반의 깔끔한 영문 추천.
              </Callout>
            </div>
          </div>
        </StepCard>

        {/* 4. Git & GitHub CLI */}
        <StepCard
          no={4}
          total={TOTAL}
          id="setup-4"
          title="Git · GitHub CLI 설치 + 로그인"
        >
          <Callout title="macOS는 Git이 이미 있을 확률이 높아요">
            터미널에{" "}
            <code className="font-mono text-[13px] text-[var(--s2-blue)]">
              git
            </code>{" "}
            입력 → 사용법이 주르륵 나오면 설치돼 있는 것. 설치 창이 뜨면
            안내대로 설치하고, 바로 ②로 넘어가세요.
          </Callout>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-extrabold">
                ① Git — <Blue>Windows만</Blue> 설치
              </p>
              <Shot
                src="/captures/setup/git-windows.png"
                width={1443}
                height={1922}
                alt="Git for Windows 다운로드 페이지"
                url="git-scm.com/downloads/win"
                href="https://git-scm.com/downloads/win"
                highlight={{
                  top: "18.2%",
                  left: "28.5%",
                  width: "19%",
                  height: "2.4%",
                  label: "여기 클릭",
                }}
              />
              <p className="text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                <Ext href="https://git-scm.com/downloads/win">
                  git-scm.com/downloads/win
                </Ext>
                에서 <b>Click here to download</b> → 받은 설치 파일에서 전부
                기본값으로 <b>Next</b>만.
              </p>
              <Verify
                command="git --version"
                lines={[
                  { prompt: true, text: "git --version" },
                  { text: "git version 2.50.1.windows.1" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-extrabold">② GitHub CLI 설치</p>
              <p className="text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                <Ext href="https://github.com/cli/cli/releases/latest">
                  github.com/cli/cli/releases/latest
                </Ext>{" "}
                에서 설치 파일을 받아 실행합니다 — <b>Windows</b>는{" "}
                <b>windows_amd64.msi</b>, <b>맥</b>은 <b>macOS_arm64.pkg</b>.
                (winget · brew를 쓸 줄 안다면 그걸로 설치해도 됩니다 —{" "}
                <Ext href="https://cli.github.com/">cli.github.com</Ext> 참고)
              </p>
              <Verify
                command="gh --version"
                lines={[
                  { prompt: true, text: "gh --version" },
                  { text: "gh version 2.91.0 (2026-04-22)" },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ③ 로그인 — 터미널과 GitHub 계정 연결
            </p>
            <CopyBlock label="터미널에 붙여넣기" command="gh auth login" />
            <p className="text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
              질문이 나오면 전부 <b>Enter로 기본값 선택</b> → 브라우저가 열리면
              터미널에 표시된 <b>일회용 코드</b> 입력 → 완료.
            </p>
            <Verify
              command="gh auth status"
              lines={[
                { prompt: true, text: "gh auth status" },
                { text: "github.com" },
                {
                  text: "  ✓ Logged in to github.com account IRONAGE-Park (keyring)",
                },
                { dim: true, text: "  - Active account: true" },
                { dim: true, text: "  - Git operations protocol: https" },
              ]}
            />
          </div>
        </StepCard>

        {/* 5. Supabase */}
        <StepCard
          no={5}
          total={TOTAL}
          id="setup-5"
          title="Supabase 가입 — GitHub 계정으로"
          tag="이미 계정이 있다면 건너뛰기"
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/supabase-signup.png"
              width={1443}
              height={1922}
              alt="Supabase 가입 화면"
              url="supabase.com/dashboard/sign-up"
              href="https://supabase.com/dashboard/sign-up"
              highlight={{
                top: "35.8%",
                left: "29%",
                width: "42%",
                height: "3.8%",
                label: "GitHub으로 가입!",
              }}
            />
            <div className="flex flex-col gap-4">
              <MiniSteps
                items={[
                  <>
                    데이터베이스 서비스입니다 —{" "}
                    <Ext href="https://supabase.com/dashboard/sign-up">
                      supabase.com/dashboard/sign-up
                    </Ext>{" "}
                    접속.
                  </>,
                  <>
                    이메일 가입 대신 <b>Continue with GitHub</b> →{" "}
                    <b>Authorize</b> 승인하면 끝.
                  </>,
                  <>
                    확인:{" "}
                    <Ext href="https://supabase.com/dashboard">
                      supabase.com/dashboard
                    </Ext>
                    가 열리고 <b>New project</b> 버튼이 보이면 성공.
                  </>,
                ]}
              />
              <Callout title="왜 GitHub으로?">
                비밀번호가 늘지 않고, 저장소 연결 시 권한이 클릭 한 번으로
                이어집니다.
              </Callout>
            </div>
          </div>
        </StepCard>

        {/* 6. Vercel */}
        <StepCard
          no={6}
          total={TOTAL}
          id="setup-6"
          title="Vercel 가입 — 역시 GitHub 계정으로"
          tag="이미 계정이 있다면 건너뛰기"
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/vercel-signup.png"
              width={1443}
              height={1922}
              alt="Vercel 가입 화면"
              url="vercel.com/signup"
              href="https://vercel.com/signup"
              highlight={{
                top: "32.2%",
                left: "29%",
                width: "42%",
                height: "3.6%",
                label: "여기도 GitHub!",
              }}
            />
            <MiniSteps
              items={[
                <>
                  내 서비스를 세상에 공개해 주는 배포 플랫폼 —{" "}
                  <Ext href="https://vercel.com/signup">vercel.com/signup</Ext>{" "}
                  접속.
                </>,
                <>
                  <b>Continue with GitHub</b> → <b>Authorize</b>. 플랜은{" "}
                  <b>Hobby(무료)</b>.
                </>,
                <>
                  확인:{" "}
                  <Ext href="https://vercel.com/dashboard">
                    vercel.com/dashboard
                  </Ext>
                  가 열리면 성공 — 3장에서 여기로 다시 옵니다.
                </>,
              ]}
            />
          </div>
        </StepCard>

        {/* 7. Orca */}
        <StepCard no={7} total={TOTAL} id="setup-7" title="Orca 설치">
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/orca-download.png"
              width={1443}
              height={1922}
              alt="Orca 다운로드 페이지"
              url="onorca.dev/download"
              href="https://www.onorca.dev/download"
              highlight={{
                top: "56%",
                left: "1.5%",
                width: "48%",
                height: "7%",
                label: "Windows는 여기",
              }}
            />
            <MiniSteps
              items={[
                <>
                  AI 에이전트 여러 개를 한 화면에서 관리하는 데스크톱 앱 —{" "}
                  <Ext href="https://www.onorca.dev/download">
                    onorca.dev/download
                  </Ext>{" "}
                  접속.
                </>,
                <>
                  <b>Windows</b>는 x64 installer, <b>맥</b>은 Apple Silicon
                  DMG를 받아 실행.
                </>,
                <>
                  확인: Orca를 실행해서 첫 화면이 뜨면 성공 — 터미널 없이 앱
                  아이콘으로 열면 됩니다.
                </>,
              ]}
            />
          </div>
        </StepCard>

        {/* 중간 점검 */}
        <div
          id="setup-check"
          className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9"
        >
          <p className="mb-4 text-[18px] font-extrabold">
            ✅ 중간 점검 — 터미널에서 한 번에
          </p>
          <div className="flex flex-col gap-3">
            <CopyBlock
              label="터미널에 붙여넣기"
              command="node -v; git --version; gh auth status; claude --version"
            />
            <Term
              title="실제 실행 결과 — 진행자 PC"
              lines={[
                {
                  prompt: true,
                  text: "node -v; git --version; gh auth status; claude --version",
                },
                { text: "v24.14.1" },
                { text: "git version 2.50.1.windows.1" },
                { text: "github.com" },
                {
                  text: "  ✓ Logged in to github.com account IRONAGE-Park (keyring)",
                },
                { text: "2.1.222 (Claude Code)" },
              ]}
            />
            <p className="text-center text-[13.5px] text-[var(--s2-faint)]">
              네 가지 모두 나온다면 도구 준비 끝 — 마지막으로 실습 프로젝트를
              만들어 연결합니다.
            </p>
          </div>
        </div>

        {/* 8. 마무리 — 리포 생성 + Orca 연결 */}
        <StepCard
          no={8}
          total={TOTAL}
          id="setup-8"
          title="마무리 — 내 프로젝트 만들고 Orca에 연결"
          intro={
            <>
              오늘 실습에서 쓸 빈 프로젝트를 GitHub에 만들고, 내 컴퓨터로
              가져와서, Orca에서 엽니다. 여기까지 되면 환경 설정 완료입니다.
            </>
          }
        >
          {/* ① 리포 생성 */}
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/github-new-repo.png"
              width={1443}
              height={1922}
              alt="GitHub 새 리포지토리 만들기 폼 — 이름 입력, README 켜기"
              url="github.com/new"
              href="https://github.com/new"
              highlight={{
                top: "18.9%",
                left: "35.5%",
                width: "52%",
                height: "3%",
                label: "이름 입력",
              }}
            />
            <div className="flex flex-col gap-4">
              <p className="text-[15px] font-extrabold">
                ① GitHub에서 새 리포지토리 만들기
              </p>
              <MiniSteps
                items={[
                  <>
                    <Ext href="https://github.com/new">github.com/new</Ext>{" "}
                    접속 — <b>Repository name</b>에{" "}
                    <code className="font-mono text-[13px]">
                      vibe-coding-practice
                    </code>{" "}
                    입력. (초록색 &ldquo;available&rdquo;이 뜨면 사용 가능)
                  </>,
                  <>
                    visibility는 <b>Public</b> 그대로, <b>Add README</b>를{" "}
                    <b>On</b>으로 켭니다.
                  </>,
                  <>
                    맨 아래 초록색 <b>Create repository</b> 클릭.
                  </>,
                ]}
              />
            </div>
          </div>
          {/* ② 생성 확인 */}
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/github-repo-created.png"
              width={1443}
              height={1922}
              alt="생성된 vibe-coding-practice 리포지토리 페이지"
              url="github.com/내아이디/vibe-coding-practice"
            />
            <div className="flex flex-col gap-4">
              <p className="text-[15px] font-extrabold">
                ② 이 화면이 보이면 저장소 완성
              </p>
              <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
                <span className="font-mono text-[13px]">
                  github.com/내아이디/vibe-coding-practice
                </span>{" "}
                — 이 주소가 오늘 만들 서비스의 집입니다. README.md 파일 하나가
                들어 있습니다.
              </p>
              <p className="text-[15px] font-extrabold">
                ③ 초록색 <Blue>Code</Blue> 버튼에서 주소 복사
              </p>
              <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
                <b>Code</b> → <b>HTTPS</b> 탭의 주소를 복사합니다. 다음 단계에서
                Orca에 붙여넣을 <b>Git URL</b>입니다.
              </p>
              <CopyBlock
                label="이런 모양의 주소입니다"
                command="https://github.com/내아이디/vibe-coding-practice.git"
              />
            </div>
          </div>
          {/* ④~⑧ Orca에서 가져오기 */}
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ④ Orca에서 <Blue>새 워크스페이스</Blue> 열기
            </p>
            <Shot
              src="/captures/orca/1-new-workspace.jpg"
              width={522}
              height={482}
              alt="Orca 왼쪽 Projects 옆의 + 버튼"
              url="Orca — 새 워크스페이스"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              왼쪽 <b>Projects</b> 옆의 <b>+</b> 버튼을 누릅니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ⑤ <Blue>새 프로젝트 추가</Blue>
            </p>
            <Shot
              src="/captures/orca/2-new-project.jpg"
              width={645}
              height={621}
              alt="작업 트리 만들기 창 — 프로젝트 목록에서 새 프로젝트 추가"
              url="Orca — 작업 트리 만들기"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              <b>프로젝트</b> 목록을 펼치고 맨 아래 <b>새 프로젝트 추가</b>를
              누릅니다. 에이전트는 <b>Claude</b> 그대로 두세요.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ⑥ <Blue>URL에서 복제</Blue> 선택
            </p>
            <Shot
              src="/captures/orca/3-url-copy.jpg"
              width={962}
              height={822}
              alt="프로젝트 추가 창 — URL에서 복제 선택"
              url="Orca — 프로젝트 추가"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              &ldquo;다른 추가 방법&rdquo; 아래의 <b>URL에서 복제</b>를 누릅니다.
              (폴더 찾아보기는 이미 받아둔 프로젝트가 있을 때 씁니다)
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ⑦ GitHub에서 <Blue>주소 복사</Blue>
            </p>
            <Shot
              src="/captures/orca/4-copy-url-on-github.jpg"
              width={1295}
              height={451}
              alt="GitHub 저장소의 초록 Code 버튼에서 HTTPS 주소 복사"
              url="github.com/내아이디/vibe-coding-practice"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              내 저장소로 가서 초록색 <b>Code</b> → <b>HTTPS</b> 주소를 복사
              버튼으로 복사합니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ⑧ 붙여넣고 <Blue>클론</Blue>
            </p>
            <Shot
              src="/captures/orca/5-copied-url-and-clone.jpg"
              width={735}
              height={660}
              alt="URL에서 복제 창 — Git URL 붙여넣고 클론 버튼 클릭"
              url="Orca — URL에서 복제"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              <b>Git URL</b>에 붙여넣고, <b>상위 폴더</b>는 그대로 둔 채{" "}
              <b>클론</b>을 누릅니다. 잠시 뒤 왼쪽 목록에 프로젝트가 나타나면
              성공입니다.
            </p>
            <Callout title="터미널 없이 여기까지 끝났습니다">
              Orca가 <b>내려받기 · 프로젝트 등록 · 편집기 열기</b>를 한 번에
              해줍니다. 이제 이 프로젝트 안에서 Claude를 열어볼 차례입니다.
            </Callout>
          </div>
        </StepCard>

        {/* 9. Orca에서 Claude 열기 */}
        <StepCard
          no={9}
          total={TOTAL}
          id="setup-9"
          title="Orca에서 Claude Code 열기"
          intro={
            <>
              터미널에 명령어를 칠 필요 없습니다. 프로젝트 탭 옆의 <b>+</b>{" "}
              버튼에서 바로 열 수 있어요.
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ① <Blue>+ → Claude</Blue> 선택
            </p>
            <Shot
              src="/captures/orca/6-open-claude.jpg"
              width={1637}
              height={762}
              alt="Orca 탭 옆 + 버튼 메뉴에서 Claude 선택"
              url="Orca — 새 탭 메뉴"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              탭 오른쪽의 <b>+</b> 를 누르면 열 수 있는 목록이 나옵니다. 그중{" "}
              <b>Claude</b>를 선택하세요. (Codex · Gemini 등 다른 AI도 같은
              방식으로 열립니다)
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ② <Blue>이 폴더를 신뢰</Blue>하시겠습니까?
            </p>
            <Shot
              src="/captures/orca/7-trust-this-folder.jpg"
              width={1374}
              height={678}
              alt="Claude Code 첫 실행 — 폴더 신뢰 확인 화면"
              url="Claude Code — 폴더 신뢰 확인"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              처음 여는 폴더라면 이 확인이 한 번 나옵니다. <b>내가 만든
              프로젝트</b>이니 신뢰를 선택하면 됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ③ 이 화면이 보이면 <Blue>준비 완료</Blue>
            </p>
            <Shot
              src="/captures/orca/8-completed-to-open-claude.jpg"
              width={2560}
              height={1392}
              alt="Orca 안에서 실행된 Claude Code 시작 화면"
              url="Orca — Claude Code 실행됨"
            />
            <MiniSteps
              items={[
                <>
                  <b>Welcome back</b> 인사와 함께 입력창이 뜨면 성공입니다.
                </>,
                <>
                  <b>로그인이 필요하다고 나오면</b>{" "}
                  <code className="font-mono text-[13px]">/login</code> 을 입력해
                  브라우저에서 Claude 계정으로 로그인하세요. (2단계에서 이미
                  했다면 넘어갑니다)
                </>,
                <>
                  앞으로 Claude를 쓸 때는 <b>항상 이 방식</b>으로 엽니다 — 2장,
                  3장에서 계속 사용합니다.
                </>,
              ]}
            />
          </div>
        </StepCard>

        {/* 10. CLAUDE.md */}
        <StepCard
          no={10}
          total={TOTAL}
          id="setup-10"
          title="AI 가이드라인 붙여넣기 — CLAUDE.md"
          intro={
            <>
              Claude가 <b>매 대화를 시작할 때 자동으로 읽는 규칙 파일</b>입니다.
              기술 스택·작업 방식·말투를 여기 한 번만 적어두면, 앞으로 매번
              설명하지 않아도 됩니다.
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/setup/orca-claude-md.png"
              width={2558}
              height={1397}
              alt="Orca에서 CLAUDE.md 파일을 편집기로 열어 작성한 화면"
              url="Orca — CLAUDE.md 편집 화면"
              highlight={{
                top: "80.2%",
                left: "86.3%",
                width: "12.5%",
                height: "2.1%",
                label: "여기에 CLAUDE.md 생성",
              }}
            />
            <div className="flex flex-col gap-4">
              <MiniSteps
                items={[
                  <>
                    Orca 오른쪽 <b>파일 목록</b>에서 프로젝트 폴더를 우클릭 →{" "}
                    <b>새 파일</b>을 만들고 이름을{" "}
                    <code className="font-mono text-[13px]">CLAUDE.md</code> 로
                    합니다. (터미널을 쓸 필요 없습니다)
                  </>,
                  <>
                    파일을 클릭하면 가운데에 <b>편집기</b>가 열립니다 — 아래
                    내용을 <b>전체 복사</b>해서 붙여넣고 저장(Ctrl+S)합니다.
                  </>,
                  <>
                    Claude Code를 실행 중이었다면 껐다가 다시 켭니다 — 새
                    세션부터 이 규칙을 읽습니다.
                  </>,
                ]}
              />
              <p className="text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                <b>.md</b>는 마크다운(Markdown) 파일 확장자입니다 — Orca가
                제목·목록을 예쁘게 보여주지만, 실제로는 그냥 글자만 든 문서예요.
              </p>
            </div>
          </div>
          <CopyDoc filename="CLAUDE.md" content={CLAUDE_MD} />
          <Callout title="왜 이걸 미리 적어두나요?">
            AI는 <b>내가 정해준 만큼만</b> 일관되게 일합니다. &ldquo;한 번에
            하나씩&rdquo;, &ldquo;요청 안 한 건 만들지 마&rdquo;, &ldquo;쉬운
            말로 설명해&rdquo; 같은 규칙을 매번 타이핑하는 대신 파일 하나로
            끝내는 것 — 1교시에서 본 <b>작게 · 자주 · 되돌릴 수 있게</b>라는
            바이브 코딩의 리듬을 AI에게 심어두는 작업입니다.
          </Callout>
          <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
            <p className="mb-3 flex items-center gap-2 text-[14.5px] font-extrabold">
              <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[var(--s2-blue)] text-[11px] font-black text-white">
                ✓
              </span>
              잘 적용됐는지 확인
            </p>
            <Term
              title="Claude Code 안에서"
              lines={[
                { dim: true, text: "> 이 프로젝트의 규칙을 요약해줘." },
                { text: "" },
                {
                  dim: true,
                  text: "…스택·작업 방식·말투를 그대로 말하면 성공",
                },
              ]}
            />
            <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
              내용이 마음에 안 들면 언제든 이 파일을 고치면 됩니다. 규칙을
              바꾸는 것도 여러분의 몫입니다 — 자세한 활용법은{" "}
              <b>5장 유용한 도구들</b>에서 다룹니다.
            </p>
          </div>
        </StepCard>
      </main>

      <Pager
        prev={{ href: "/", label: "홈 — 실습 목차" }}
        next={{ href: "/plan", label: "02 문제 정의" }}
      />
      <SiteFooter />
    </div>
  );
}
