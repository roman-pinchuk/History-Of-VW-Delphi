unit Unit10;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, pngimage, ExtCtrls, jpeg, ComCtrls;

type
  TForm10 = class(TForm)
    Memo1: TMemo;
    Image1: TImage;
    Panel1: TPanel;
    RadioButton1: TRadioButton;
    RadioButton2: TRadioButton;
    Image6: TImage;
    Image5: TImage;
    Button1: TButton;
    Button2: TButton;
    Bevel1: TBevel;
    Edit1: TEdit;
    Button3: TButton;
    Image2: TImage;
    Button4: TButton;
    procedure Image6Click(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure RadioButton1Click(Sender: TObject);
    procedure RadioButton2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Image5Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
  private
    { Private declarations }
  public
   name:string;

    { Public declarations }
  end;

var
  Form10: TForm10;

implementation

uses Unit2, Unit1, Unit13, Unit12;

{$R *.dfm}



procedure TForm10.Button1Click(Sender: TObject);
begin
 memo1.Lines.Clear;
end;

procedure TForm10.Button2Click(Sender: TObject);
begin
 memo1.Lines.SaveToFile(form1.patch+name);
end;

procedure TForm10.Button3Click(Sender: TObject);
var
  Find:string;
  i:integer;
begin
find:=Edit1.Text;
For i:=0 to Memo1.Lines.Count-1 do
If Pos(FIND, Memo1.Lines.Text)<>0
Then
Begin
Memo1.SetFocus();
Memo1.SelStart:=Pos(FIND,Memo1.Lines.Text)-1;
Memo1.SelLength:=Length(FIND);
End;

end;

procedure TForm10.Button4Click(Sender: TObject);
begin
 form12.show;
end;

procedure TForm10.FormClose(Sender: TObject; var Action: TCloseAction);
begin
 form10.hide;
 form2.show;
end;

procedure TForm10.Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm10.Image6Click(Sender: TObject);
begin
 form10.Hide;
 form2.show;
end;

procedure TForm10.RadioButton1Click(Sender: TObject);
begin
 name:='test\test1.txt';
 memo1.lines.loadfromfile(form1.patch+'test\test1.txt');
end;

procedure TForm10.RadioButton2Click(Sender: TObject);
begin
  name:='test\test2.txt';
  memo1.lines.loadfromfile(form1.patch+'test\test2.txt');
end;


end.
