uses java.lang.Exception
class Table extends Exception {
  public construct(msg : String ){
    super(msg) 
  }
  public function ノﾟДﾟノ(){
    print(this.Message);
  }
}
class Meme{
  public function ╯︵(┻━━┻ : Table){
    throw ┻━━┻ 
  }
}
var ┻━┻ = new Table("Table flipped but it's cool I got this. ");
var ╯°□° = new Meme()

try{
  (╯°□°).╯︵ (┻━┻)
} catch (┬──┬ : Table){
  ┬──┬.ノﾟДﾟノ()
}



class BFInterpreter{
  private var _Tape : int[] = new int[30000];
  private var _OutputBuffer : String = "";
  private var _InputBuffer : String = "";
  private var _Code : char[] = {};
  private var _mem_i : int = 0;
  private var _pc : int = 0;
  private var _in_i : int = 0;
  
  construct(){}
  construct(startingTape : int[] ){
    _Tape = startingTape;
  }
  private function shiftLeft(){ _mem_i--; }
  private function shiftRight(){ _mem_i++; }
  private function increment(){ _Tape[_mem_i]++; }
  private function decrement(){ _Tape[_mem_i]--; }
  private function output(){_OutputBuffer += _Tape[_mem_i] as char }
  private function input(){_Tape[_mem_i] =_InputBuffer.charAt(_in_i) as int; _in_i++;}
  private function loopStart(){
    if( _Tape[_mem_i] == 0){
      var level = 0;
      while(_Code[_pc] != ']' && level > 0 && _pc < _Tape.length){
        _pc++;
        if(_Code[_pc] == '['){
          level++;
        } else if (_Code[_pc] == ']'){
          level--;
        }
      }
    }
  }
  private function loopEnd(){
    var level = 0;
    while(_pc >=0 && _Code[_pc] != '[' && level > 0){
      _pc--;
      if(_Code[_pc] == ']'){
        level++;
      } else if (_Code[_pc] == '['){
        level--;
      }
    }
    _pc--;
  }

  public property set Code(newCode : String){
    _Code = newCode as char[];
  }
  public property set Input(newInput : String ){
    _InputBuffer = newInput; 
  }
  public property get Output() : String {
    return _OutputBuffer;
  }
  
  public function run() : String {
    _pc = 0;
    _OutputBuffer = "";
    for(i in _Tape){
      i = 0; 
    }
    while(_pc < _Code.length){
      breakpoint++;
	  if(breakpoint > 100){
        print("BREAKPOINT.");
        break;
	  }
	  print("FETCH. PC:"+_pc+" CODE:"+_Code[_pc]+ "  TAPE:");
	  printTape();
      switch( _Code[_pc] ){
        case '<': shiftLeft();  break;
        case '>': shiftRight(); break;
        case '+': increment();  break;
        case '-': decrement();  break;
        case '.': output();     break;
        case ',': input();      break;
        case '[': loopStart();  break;
        case ']': loopEnd();    break;
        default: break;
      }
      _pc++;
    }
    return _OutputBuffer;
  }
  public function runWithInput(newInput : String) : String {
    this.Input = newInput;
    return this.run();
  }
  public function runCodeWithInput(newCode : String , newInput : String) : String {
    this.Code = newCode;
    this.Input = newInput;
    return this.run();
  }
  public function printTape(){
    var out : String = "";
    out = out.concat("["+_Tape[0] + "][");
    out = out.concat(_Tape[1] + "][");
    out = out.concat(_Tape[2] + "][");
    out = out.concat(_Tape[3] + "][");
    out = out.concat(_Tape[4] + "]");
    print(out);
  }
}
  
var bf = new BFInterpreter();

bf.Code = "+++++[->+++++<]";
bf.printTape();
bf.run();
bf.printTape();
