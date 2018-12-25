unit Unit9;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls, ComCtrls, pngimage;

type
  TForm9 = class(TForm)
    Button1: TButton;
    TabControl1: TTabControl;
    RichEdit1: TRichEdit;
    RadioGroup1: TRadioGroup;
    Label1: TLabel;
    Image5: TImage;
    Image6: TImage;
    procedure FormCreate(Sender: TObject);
    procedure TabControl1Change(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure Image5Click(Sender: TObject);
    procedure Image6Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);

  private
    { Private declarations }
  public
    test:tstrings;
    nom,sum:integer;
    name:string[30];
    tab_ind:integer;
  end;
  var
  Form9: TForm9;
  list:string;
  vopros:string;
  tab,kol:integer;

    { Public declarations }

implementation
 uses Unit1, Unit8, Unit13;

{$R *.dfm}
procedure TForm9.Button1Click(Sender: TObject);
begin
if radiogroup1.itemindex <> -1   then
 begin
  if (radiogroup1.itemindex+1=strtoint(test.strings[nom+5]) )
   then
    begin
     sum:=sum+1;
     label1.Caption:='Правильно';
     label1.Font.Color:=clGreen;
    end
   else
   begin
   label1.Caption:='Не правильно';
   label1.Font.Color:=clRed;
   end;
    tabcontrol1Change(nil);
 end
  else
   Application.MessageBox('Вы не выбрали ответ','Ваш результат',mb_iconAsterisk+mb_ok);
end;

procedure TForm9.FormClose(Sender: TObject; var Action: TCloseAction);
begin
 form9.Hide;
 form8.show;
end;

procedure TForm9.FormCreate(Sender: TObject);
var
i:integer;
begin
test:=tstringlist.Create;
test.LoadFromFile(form1.patch+'test\test1.txt');
kol:=strtoint(test.Strings[0]);
form9.TabControl1.Tabs.Clear;
form9.sum:=0;
form9.nom:=1;
for i:=0 to kol-1 do
  begin
    form9.tabcontrol1.Tabs.Append('Вопрос №'+inttostr(i+1));
  end;
  for i:=nom to nom+4 do
  form9.RichEdit1.Lines.Append(test.Strings[i]);
  form9.RadioGroup1.Items.Clear;
  for i:=nom+6 to nom+8 do
  form9.RadioGroup1.Items.Append(test.Strings[i]);
  tab:=0;

end;



procedure TForm9.Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm9.Image6Click(Sender: TObject);
begin
 close;
end;



procedure TForm9.TabControl1Change(Sender: TObject);
 var
 i,j:integer;
 begin
  tab:=tab+1;
  vopros:='Вопрос - '+inttostr(tab);
   if tabcontrol1.Tabs.Count-1>-1 then
    begin
     tabcontrol1.Tabs.Delete(0);
    end;
 radiogroup1.items.clear;
 richedit1.Lines.Clear;
 if nom<test.count-9 then
  begin
   nom:=nom+9;
   richedit1.Lines.Clear;
   for i:=nom to nom+4 do
   richedit1.Lines.append(test.strings[i]);
   radiogroup1.items.clear;
   for i:=nom+6 to nom+8 do
    radiogroup1.Items.append(test.strings[i]);
  end
 else
  begin
   if messagedlg('Вопросов больше нет',mtinformation,[mbok],0)= mrok then
     begin
      radiogroup1.items.clear;
      richedit1.Lines.Clear;
     end;
  end;
end;

END.
