unit Unit12;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ExtCtrls, TeeProcs, TeEngine, Chart, Grids, StdCtrls, jpeg, pngimage;

type
  TForm12 = class(TForm)
    Tab: TStringGrid;
    Image1: TImage;
    Image6: TImage;
    Image5: TImage;
    procedure FormActivate(Sender: TObject);
    procedure Image5Click(Sender: TObject);
    procedure Image6Click(Sender: TObject);
  private
    { Private declarations }
  public

    { Public declarations }
  end;
   rez=record
   user:string[30];
   rez_sum:integer;
   data:string[8];
   time:string[8] ;
  end;

var
  Form12: TForm12;
  k:integer;
  f_rez:file of rez;
  zap:rez;


implementation

uses Unit1, Unit13, Unit2;

{$R *.dfm}

procedure viv_rez;
 begin
 assignfile(f_rez,form1.patch+'test\rez.dat');
 {$I-}
 reset(f_rez);
 {$I+}
 if ioresult<>0 then
 begin
  showmessage('file not');
  exit;
 end;
 k:=1;
 while not Eof(f_rez) do
 begin
  read(f_rez,zap);
  form12.tab.rowcount:=k+1;
  form12.tab.cells[0,k]:=zap.user;
  form12.tab.cells[1,k]:=inttostr(zap.rez_sum);
  form12.tab.cells[2,k]:=zap.data;
  form12.tab.cells[3,k]:=zap.time;
  k:=k+1;
 end;
 closefile(f_rez);
 form12.tab.rowcount:=K;
 end;

procedure TForm12.FormActivate(Sender: TObject);
begin
 tab.Cells[0,0]:=' ФИО';
 tab.Cells[1,0]:='   Быллы';
 tab.Cells[2,0]:='   Дата';
 tab.Cells[3,0]:='   Время';
 viv_rez;
end;

procedure TForm12.Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm12.Image6Click(Sender: TObject);
begin
 close;
 form2.show;
end;

end.
