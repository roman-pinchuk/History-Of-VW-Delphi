unit PASSWORD;

interface

uses Windows, SysUtils, Classes, Graphics, Forms, Controls, StdCtrls, 
  Buttons, jpeg, ExtCtrls;

type
  TPasswordDlg = class(TForm)
    Label1: TLabel;
    Password: TEdit;
    OKBtn: TButton;
    CancelBtn: TButton;
    Image1: TImage;
    procedure CancelBtnClick(Sender: TObject);
    procedure OKBtnClick(Sender: TObject);

  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  PasswordDlg: TPasswordDlg;

implementation

uses Unit7, Unit10, Unit2;

{$R *.dfm}

procedure TPasswordDlg.CancelBtnClick(Sender: TObject);
begin
   begin
   PasswordDlg.hide;
End;
end;
procedure TPasswordDlg.OKBtnClick(Sender: TObject);
begin
if PasswordDlg.Password.Text='0000' then
   begin
    Form7.Hide;
    PasswordDlg.hide;
    Password.Clear;
    form2.hide;
    form10.show;
   end
   else
   begin
    Application.MessageBox('Вы ввели неверный пароль. Повторите ввод пароля!',
    'Ввод пароля',mb_IconAsterisk+mb_ok);
     PasswordDlg.Password.Text:='';
     PasswordDlg.Password.setfocus
   end;
end;
end.



 
