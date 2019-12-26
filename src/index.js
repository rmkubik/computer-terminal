import React from "react";
import ReactDOM from "react-dom";
import Typed from "typed.js";
import "./index.css";

const Sequence = ({ children, parentRef }) => {
  const [currentLine, setCurrentLine] = React.useState(0);
  const finished = () => {
    setCurrentLine(currentLine + 1);
    // parentRef.current.scrollTop = parentRef.current.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
  };

  const lines = children.slice(0, currentLine + 1);

  const boundLines = React.Children.map(lines, child => {
    return React.cloneElement(child, {
      finished
    });
  });

  return <div>{boundLines}</div>;
};

const Line = ({
  text,
  typed = false,
  finished = () => {},
  postTypingDelay = 0,
  setFinishedPlayingRef
}) => {
  const outputRef = React.useRef();
  const lineRef = React.useRef();
  const typedRef = React.useRef();

  const finishedTyping = () => {
    if (postTypingDelay === -1) {
      // we want to hang on this line forever
      // -1 means inifinite delay

      // This is hardcoded so that the line can tell the app
      // that this is the last line and it has finished
      // This should be genericized and probably Sequence's resposibility?
      setFinishedPlayingRef(true);
      return;
    }

    setTimeout(() => {
      if (typed) {
        typedRef.current.showCursor = false;
        lineRef.current.querySelector(".typed-cursor").style.display = "none";
      }
      finished();
    }, postTypingDelay);
  };

  const options = {
    strings: [text],
    typeSpeed: 50,
    backSpeed: 50,
    onStringTyped: finishedTyping
  };

  React.useEffect(() => {
    if (typed) {
      typedRef.current = new Typed(outputRef.current, options);
      return () => typedRef.current.destroy();
    }
  }, [text, typed]);

  React.useEffect(() => {
    if (!typed) {
      finishedTyping();
    }
  }, [typed]);

  return (
    <div className={typed ? "input" : "output"} ref={lineRef}>
      <span
        ref={outputRef}
        dangerouslySetInnerHTML={{ __html: typed ? "" : text }}
      />
    </div>
  );
};

const App = () => {
  const parentRef = React.useRef();
  const [userInteracted, setUserInteracted] = React.useState(false);
  const [finishedPlaying, setFinishedPlaying] = React.useState(false);
  const finishedPlayingRef = React.useRef(finishedPlaying);
  const setFinishedPlayingRef = newVal => {
    setFinishedPlaying(newVal);
    finishedPlayingRef.current = newVal;
  };

  React.useEffect(() => {
    document.addEventListener("click", () => {
      if (finishedPlayingRef.current) {
        window.location.reload();
      } else {
        setUserInteracted(true);
      }
    });
  }, []);

  return (
    <div ref={parentRef}>
      {!userInteracted ? (
        <Sequence parentRef={parentRef}>
          <Line text="Awaiting operator input..." typed={false} />
          <Line
            text="$ "
            typed={true}
            postTypingDelay={-1}
            setFinishedPlayingRef={() => {}}
          />
        </Sequence>
      ) : (
        <Sequence parentRef={parentRef}>
          <Line text="Awaiting operator input..." typed={false} />
          <Line
            text="$ <span class='command'>shield</span> ^200 power ^500 <span class='success'>on</span>"
            typed={true}
            postTypingDelay={1000}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="Initializing boot sequence..." typed={false} />
          <Line text="[^200.^200.^200.^200.^200.^200.]" typed={true} />
          <Line
            text="<span class='success'>SUCCESS: System booted</span>"
            typed={false}
            postTypingDelay={200}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="|\-._/\_.-/|" typed={false} />
          <Line
            text="|&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;|"
            typed={false}
          />
          <Line text="|___o()o___|" typed={false} />
          <Line text="|__((<>))__|" typed={false} />
          <Line text="\&nbsp;&nbsp;&nbsp;o\\/o&nbsp;&nbsp;/" typed={false} />
          <Line
            text="&nbsp;\&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;/ "
            typed={false}
          />
          <Line
            text="&nbsp;&nbsp;\&nbsp;&nbsp;||&nbsp;&nbsp;/  "
            typed={false}
          />
          <Line text="&nbsp;&nbsp;&nbsp;'.||.'   " typed={false} />
          <Line text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;''     " typed={false} />
          <Line text="Hello, operator. Welcome to Shield OS." typed={false} />
          <Line text="&nbsp;" typed={false} />
          <Line
            text="$ ^2000 <span class='command'>shield</span> ^200 fortify <span class='warn'>perimeter</span>"
            typed={true}
            postTypingDelay={1000}
          />
          <Line
            text="Activating defense systems..."
            typed={false}
            postTypingDelay={400}
          />
          <Line
            text="<span class='success'>SUCCESS: Perimeter defense battery [1/4] - ARMED</span>"
            typed={false}
          />
          <Line
            text="<span class='success'>SUCCESS: Perimeter defense battery [2/4] - ARMED</span>"
            typed={false}
          />
          <Line
            text="<span class='success'>SUCCESS: Perimeter defense battery [3/4] - ARMED</span>"
            typed={false}
            postTypingDelay={900}
          />
          <Line
            text="<span class='error'>ERROR: Perimeter defense battery [4/4] - MALFUNCTION</span>"
            typed={false}
          />
          <Line
            text="<span class='error'>AREA UNSECURE - Southern perimeter undefended</span>"
            typed={false}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="Running diagnostic..." typed={false} />
          <Line text="[^200.^200.^600.^600.^600.^1600.]" typed={true} />
          <Line
            text="<span class='error'>ERROR: Unable to establish connection with battery 4</span>"
            typed={false}
          />
          <Line
            text="<span class='error'>ERROR: Cannot confirm AREA is safe</span>"
            typed={false}
          />
          <Line
            text="<span class='error'>DEFENSE SYSTEM COMPROMISED</span>"
            typed={false}
            postTypingDelay={1000}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="Starting quarantine procedure..." typed={false} />
          <Line text="[^200.^200.^200.^200.^200.^200.]" typed={true} />
          <Line
            text="Activating nerve agent container system..."
            typed={false}
          />
          <Line
            text="<span class='success'>SUCCESS: Nerve agent reservoir [1/3] - OPENED</span>"
            typed={false}
            postTypingDelay={400}
          />
          <Line
            text="<span class='success'>SUCCESS: Nerve agent reservoir [2/3] - OPENED</span>"
            typed={false}
            postTypingDelay={600}
          />
          <Line
            text="<span class='success'>SUCCESS: Nerve agent reservoir [3/3] - OPENED</span>"
            typed={false}
            postTypingDelay={800}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="Scanning for lifeforms..." typed={false} />
          <Line text="[^200.^200.^200.^200.^200.^200.]" typed={true} />
          <Line
            text="<span class='warn'>WARNING: Lifeform detected in computer room</span>"
            typed={false}
          />
          <Line text="&nbsp;" typed={false} />
          <Line
            text="Redirecting nerve agent distribution system..."
            typed={false}
            postTypingDelay={800}
          />
          <Line
            text="Opening computer room vents..."
            typed={false}
            postTypingDelay={400}
          />
          <Line
            text="<span class='success'>SUCCESS: Computer room vent [1/2] - OPENED</span>"
            typed={false}
            postTypingDelay={400}
          />
          <Line
            text="<span class='success'>SUCCESS: Computer room vent [2/2] - OPENED</span>"
            typed={false}
          />
          <Line
            text="Monitoring computer room nerve agent concentration..."
            typed={false}
            postTypingDelay={400}
          />
          <Line
            text="<span class='error'>20%</span>"
            typed={false}
            postTypingDelay={600}
          />
          <Line
            text="<span class='error'>43%</span>"
            typed={false}
            postTypingDelay={800}
          />
          <Line
            text="<span class='warn'>70%</span>"
            typed={false}
            postTypingDelay={1200}
          />
          <Line
            text="<span class='warn'>90%</span>"
            typed={false}
            postTypingDelay={600}
          />
          <Line
            text="<span class='success'>SUCCESS: 100% nerve agent concentration reached</span>"
            typed={false}
            postTypingDelay={1000}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="Scanning for lifeforms..." typed={false} />
          <Line text="[^200.^200.^200.^200.^1000.^2000.]" typed={true} />
          <Line
            text="<span class='success'>SUCCESS: No lifeforms detected</span>"
            typed={false}
            postTypingDelay={2000}
          />
          <Line text="&nbsp;" typed={false} />
          <Line
            text="<span class='success'>SUCCESS: Quarantine procedure - COMPLETED</span>"
            typed={false}
          />
          <Line
            text="Power down nerve agent container system..."
            typed={false}
          />
          <Line text="[^200.^200.^200.^200.^200.^200.]" typed={true} />
          <Line
            text="Power down nerve agent distribution system..."
            typed={false}
          />
          <Line text="[^200.^200.^200.^200.^200.^200.]" typed={true} />
          <Line
            text="Entering hibernation mode..."
            typed={false}
            postTypingDelay={600}
          />
          <Line
            text="<span class='success'>SUCCESS: Hibernation mode - ACTIVATED</span>"
            typed={false}
            postTypingDelay={1200}
          />
          <Line text="&nbsp;" typed={false} />
          <Line text="&nbsp;" typed={false} />
          <Line text="Awaiting operator input..." typed={false} />
          <Line
            text="$ "
            typed={true}
            postTypingDelay={-1}
            setFinishedPlayingRef={setFinishedPlayingRef}
          />
        </Sequence>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
