unit Unit11;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls, jpeg, pngimage;

type
  TForm11 = class(TForm)
    Memo1: TMemo;
    Edit1: TEdit;
    Button1: TButton;
    Label1: TLabel;
    Label2: TLabel;
    GroupBox1: TGroupBox;
    Timer1: TTimer;
    Label3: TLabel;
    Label4: TLabel;
    Timer2: TTimer;
    Button2: TButton;
    Image5: TImage;
    procedure Button1Click(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure Timer2Timer(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Image5Click(Sender: TObject);
  private
    { Private declarations }


    { Public declarations }
    procedure zap_rez;
end;
  rez=record
   user:string[30];
   rez_sum:integer;
   data:string[8];
   time:string[8] ;
   end;

var
  Form11: TForm11;
  test:tstrings;
  sum,i:integer;
  f_rez:file of rez;
  zap:rez;


implementation

uses Unit2, Unit1, Unit12, Unit13;

{$R *.dfm}

procedure TForm11.Button1Click(Sender: TObject);
begin
 if edit1.Text=test.Strings[i+1] then sum:=sum+1;
I:=i+2;
if i<test.Count-1 then
begin
  memo1.Lines.Clear;
  edit1.Text:='';
  memo1.Lines.Add(test.Strings[i]);
  edit1.setFocus;
  end
  else
  begin
  memo1.Lines.Clear;
  memo1.Alignment:=tacenter;
  groupbox1.Caption:='';
  edit1.text:='';
  label1.Caption:='';
  label2.Caption:='';
  memo1.Lines.Add('Ваш результат: ' + ' Вы ответили на ' + inttostr(sum) + ' вопросов(а) из ' + inttostr(i div 2) + ' вопросов ');
  timer2.Enabled:=false;
  if (sum)<=1 then
  edit1.Text:='Тест не пройден'
  else
  edit1.Text:='Тест пройден';
  Button1.Enabled:=false;
end;
end;

procedure TForm11.Button2Click(Sender: TObject);
begin
 timer2.Enabled:=false;
 name:=inputbox('Ввод имени пользователя','Введите имя','')  ;
 form11.zap_rez;
 form11.Hide;
 form12.show;
 form2.Hide;
 Button1.Enabled:=true;

end;


procedure TForm11.FormActivate(Sender: TObject);
begin
  memo1.Lines.Clear;
  edit1.Text:='';
  memo1.Lines.Add(test.Strings[0]);
  edit1.SetFocus;
  i:=0;
  sum:=0;
  timer2.Enabled:=true;

end;

procedure TForm11.FormClose(Sender: TObject; var Action: TCloseAction);
begin
 timer2.Enabled:=false;
 {name:=inputbox('Ввод имени пользователя','Введите имя','')  ;
 form11.zap_rez;
 form11.Hide;}
 form12.show;
 form2.Hide;
 Button1.Enabled:=true;

end;

procedure TForm11.FormCreate(Sender: TObject);
begin
   test:=TstringList.Create;
   test.LoadFromFile(form1.patch+'test\test2.txt');
  end;



procedure TForm11.Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm11.Timer1Timer(Sender: TObject);
var
 txt: string;
begin
  txt:=form11.Label3.Caption;
  label3.Caption:=copy(txt,2,length(txt)-1)+copy(txt,1,1);
end;

procedure TForm11.Timer2Timer(Sender: TObject);
  begin
   showmessage('Время теста истекло !');
   Timer2.Enabled := False;
   name:=inputbox('Ввод имени пользователя','Введите имя','')  ;
   form11.zap_rez;
   form12.show;
   close;
   Button1.Enabled:=true;
   end;

procedure tform11.zap_rez;
begin
assignfile(f_rez,form1.patch+'test\rez.dat');
{$I-}
reset(f_rez);
{$I+}
if ioresult<>0 then
 begin
  showmessage('Файл результатов не найден');
  rewrite(f_rez);
 end;
seek(f_rez,filesize(f_rez));
with zap do
 begin
  user:=name;
  rez_sum:=sum;
  data:=datetostr(now);
  time:=timetostr(now);
 end;
write(f_rez,zap);
closefile(f_rez);
end;


end.
