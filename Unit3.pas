unit Unit3;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Unit6, Unit5, Unit4, ComCtrls, ExtCtrls, Buttons;

type
  TForm3 = class(TForm)
    TabControl1: TTabControl;
    Frame41: TFrame4;
    Frame51: TFrame5;
    Frame61: TFrame6;
    StatusBar1: TStatusBar;
    Timer1: TTimer;
    procedure TabControl1Change(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure Frame61Image6Click(Sender: TObject);
    procedure Frame51Image6Click(Sender: TObject);
    procedure Frame41Image6Click(Sender: TObject);
    procedure Frame61Image5Click(Sender: TObject);
    procedure Frame51Image5Click(Sender: TObject);
    procedure Frame41Image5Click(Sender: TObject);

  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form3: TForm3;

implementation

uses Unit2, Unit1, Unit13;

{$R *.dfm}


procedure TForm3.FormActivate(Sender: TObject);
begin
 frame61.webbrowser1.navigate(form1.patch+'HTM_Files\History.htm');


end;

procedure TForm3.FormClose(Sender: TObject; var Action: TCloseAction);
begin
  form3.hide;
  form1.hide;
  form2.show;
  end;

procedure TForm3.FormCreate(Sender: TObject);
begin
  form3.StatusBar1.Panels.Items[0].Text:='Дата: ' +DateToStr(now);
  form3.StatusBar1.Panels.Items[1].Text:='Время: ' +TimeToStr(now);

end;

procedure TForm3.Frame41Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm3.Frame41Image6Click(Sender: TObject);
begin
  form3.hide;
  form1.hide;
  form2.show;
end;

procedure TForm3.Frame51Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm3.Frame51Image6Click(Sender: TObject);
begin
  form3.hide;
  form1.hide;
  form2.show;
end;

procedure TForm3.Frame61Image5Click(Sender: TObject);
begin
 form13.show;
end;

procedure TForm3.Frame61Image6Click(Sender: TObject);
begin
  form3.hide;
  form1.hide;
  form2.show;
end;

procedure TForm3.TabControl1Change(Sender: TObject);
begin
case Tabcontrol1.TabIndex of
  0:begin
    frame41.Hide;
    frame51.Hide;
    frame61.Show;
    end;
  1:begin
    frame51.Show;
    frame41.Hide;
    frame61.Hide;
    frame51.webbrowser1.navigate(form1.patch+'HTM_Files\Фольксваген АГ.htm');
    end;
  2:begin
    frame61.Hide;
    frame41.Show;
    frame51.Hide;
    frame41.webbrowser1.navigate(form1.patch+'HTM_Files\Golf_1.htm');
    end;
 end;
   end;

procedure TForm3.Timer1Timer(Sender: TObject);
begin
 form3.StatusBar1.Panels.Items[1].Text:='Время: '+TimeToStr(now);
end;





END.
